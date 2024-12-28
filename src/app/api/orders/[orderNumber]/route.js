import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectToDatabase from "@/lib/mongodb";

export const GET = async (req, { params }) => {
  const { orderNumber } = params;

  try {
    await connectToDatabase();

    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
export const PUT = async (req, { params }) => {
  const { orderNumber } = params;
  const { status } = await req.json();

  try {
    await connectToDatabase();

    const order = await Order.findOne({ orderNumber });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (status && ["Pending", "Completed", "Cancelled"].includes(status)) {
      order.status = status;
      await order.save();
      return NextResponse.json(order);
    }

    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { orderNumber } = params;

  try {
    await connectToDatabase();
    const order = await Order.findOneAndDelete({ orderNumber });
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};