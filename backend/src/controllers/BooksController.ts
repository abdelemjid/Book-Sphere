import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BookModel } from "../models/BookModel";
import { uploadImage } from "../utils/Uploader";

const getBook = async (req: Request, res: Response): Promise<Response | void> => {
  // check if there are any errors
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(401).json({ message: errors[0] });

  try {
    const bookdId = req.params.bookId;
    const userId = req.adminId;

    const book = await BookModel.findOne({ adminId: userId, _id: bookdId });
    if (!book) return res.status(404).json({ message: "Book not found!" });

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const updateBook = async (req: Request, res: Response): Promise<Response | void> => {
  // check if there are any errors
  const errors = validationResult(req).array();
  if (errors?.length > 0) return res.status(400).json({ message: errors[0].msg });

  try {
    const adminId = req.adminId;
    const bookId = req.body?._id;

    if (req.file) {
      const imageFile = req.file as Express.Multer.File;
      const imageUrl = await uploadImage(imageFile);
      req.body.bookImageUrl = imageUrl;
    }

    console.log("Book Body:", req.body);

    const book = await BookModel.findOneAndUpdate({ _id: bookId, adminId }, { ...req.body });
    await book?.save();
    if (!book) {
      return res
        .status(404)
        .json({ message: "Book not found or you are not authorized to access it!" });
    }

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

const deleteBook = async (req: Request, res: Response): Promise<Response | void> => {
  const errors = validationResult(req).array();
  if (errors?.length) return res.status(400).json({ message: errors[0].msg });

  try {
    const bookId = req.body.bookId;
    const adminId = req.adminId;

    const book = await BookModel.findByIdAndDelete({ _id: bookId, adminId });
    if (!book) return res.status(404).json({ message: "Book not found!" });

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

export { getBook, updateBook, deleteBook };
