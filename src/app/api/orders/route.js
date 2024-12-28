import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectToDatabase from "@/lib/mongodb";

const generateOrderNumber = () => Math.floor(10000 + Math.random() * 90000);

export const GET = async () => {
  try {
    await connectToDatabase();
    const orders = await Order.find();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export const POST = async (req) => {
  try {
    await connectToDatabase();

    const { user, book } = await req.json();

    const orderNumber = generateOrderNumber().toString();

    const newOrder = new Order({
      orderNumber,
      user,
      book,
    });

    await newOrder.save();
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error ) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
