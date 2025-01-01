import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    orderNumber: { type: String, unique: true, required: true },
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true, match: /.+\@.+\..+/ },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    utrNumber: { type: String, required: true },
    books: [{ type: Schema.Types.ObjectId, ref: "Book", required: true }],
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Cancelled"],
      default: "Pending",
    },
    totalAmmout: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
