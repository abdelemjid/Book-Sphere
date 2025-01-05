import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BookModel } from "../models/BookModel";
import { OrderModel } from "../models/OrderModel";
import { ObjectId } from "mongodb";
import { on } from "events";

const orderBook = async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(400).json({ message: errors[0].msg });

  try {
    const { bookId, quantity } = req.body;
    const userId = req.userId;

    const book = await BookModel.findOne({ _id: bookId });
    if (!book) return res.status(404).json({ message: "Sorry book not found!" });

    const total = Math.abs(quantity) * book.price;

    const order = new OrderModel({
      adminId: book.adminId,
      userId: userId,
      bookId,
      delivered: false,
      paid: false,
      orderDate: new Date().toISOString(),
      quantity: quantity,
      totalPrice: total,
    });

    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during book ordering!" });
  }
};

const getOrders = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const userId = req.userId;

    const orders = await OrderModel.aggregate([
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          bookId: 1,
          quantity: 1,
          orderDate: 1,
          delivered: 1,
          paid: 1,
          totalPrice: 1,
          "bookDetails.title": 1,
          "bookDetails.author": 1,
          "bookDetails.bookImageUrl": 1,
          "bookDetails.price": 1,
        },
      },
    ]);

    if (!orders || orders.length == 0) return res.status(404).json({ message: "No order yet!" });

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong during the orders fetching!" });
  }
};

const removeOrder = async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(400).json({ message: errors[0].msg });

  try {
    const userId = req.userId;
    const orderId = req.body.orderId;

    const order = await OrderModel.findOneAndDelete({ _id: orderId, userId });
    if (!order) return res.status(404).json({ message: "Error order not found!" });

    return res.status(200).json({ message: `Your order is successfully removed: ${order._id}` });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong during the order deletion" });
  }
};

const updateQuantity = async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(400).json({ message: errors[0].msg });

  try {
    const { orderId, quantity } = req.body;
    const userId = req.userId;

    let order = await OrderModel.findOne({
      _id: new ObjectId(orderId),
      userId: new ObjectId(userId),
    });

    if (!order) return res.status(404).json({ message: "Order not found!" });

    const book = await BookModel.findOne({
      _id: order.bookId,
    });

    if (!book)
      return res
        .status(404)
        .json({ message: "The book you ordering is removed or isn't in stock!" });

    if (quantity > 0) {
      order.totalPrice = quantity * book.price;
      order.quantity = quantity;
      order = await OrderModel.findOneAndUpdate(
        {
          _id: new ObjectId(orderId),
          userId: new ObjectId(userId),
        },
        { ...order }
      );
    }

    return res.status(201).json(order);
  } catch (error) {
    console.log((error as Error).message);
    return res.status(500).json({ message: "Somthing went wrong during the quantity update" });
  }
};

const getOrder = async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(400).json({ message: errors[0].msg });

  try {
    const orderId = req.params.orderId;
    const userId = req.userId;

    const order = await OrderModel.findOne({
      _id: new ObjectId(orderId),
      userId: new ObjectId(userId),
    });

    if (!order) return res.status(404).json({ message: "Order not found!" });

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong while fetching the order!" });
  }
};

export { orderBook, getOrders, removeOrder, updateQuantity, getOrder };
