import { Schema, model, models } from "mongoose";

const orderSchema = new Schema({
  orderNumber: { type: String, unique: true, required: true },
  user: {
    name: String,
    email: String,
    phone: String,
    address: String,
    paymentMethod: String,
  },
  book: {
    title: String,
    author: String,
    price: Number,
    image: String,
  },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", orderSchema);
export default Order;
