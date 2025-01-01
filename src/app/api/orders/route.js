import { NextResponse } from "next/server";
import Order from "@/models/Order";
import connectToDatabase from "@/lib/mongodb";


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
    await connectToDatabase(); // Ensure you are connected to the database

    // Parse the incoming request body
    const { orderNumber, user, books, utrNumber, totalAmount } = await req.json();
    // Create a new order in the database
    const newOrder = new Order({
      orderNumber,
      user,
      utrNumber,
      books,
      totalAmount,
      status: "Pending", // Set status as Pending initially
    });

    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
