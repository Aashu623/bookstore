import { Schema, model, models } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    language: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

export const Book = models.Book || model("Book", bookSchema);
