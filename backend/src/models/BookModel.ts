import mongoose, { Model, Schema } from "mongoose";
import { BookType } from "../types/Types";

const bookSchema = new Schema<BookType>({
  adminId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, requied: true },
  genres: { type: [String], required: true },
  isbn: { type: String, required: true },
  language: { type: String, required: true },
  pages: { type: Number, required: true },
  price: { type: Number, required: true },
  publicationDate: { type: Date, required: true },
  publisher: { type: String, required: true },
  stockQuantity: { type: Number, required: true },
  bookCover: { type: String, required: true },
});

export const BookModel: Model<BookType> = mongoose.model<BookType>("book", bookSchema);
