import mongoose, { Schema, Model } from "mongoose";
import { OrderType } from "../types/Types";

const orderSchema = new Schema<OrderType>({
  bookId: { type: String, required: true },
  userId: { type: String, required: true },
  quantity: { type: Number, required: true },
  orderDate: { type: Date, require: true },
});

export const OrderModel: Model<OrderType> = mongoose.model<OrderType>("order", orderSchema);
