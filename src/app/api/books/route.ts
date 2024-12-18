import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Book } from '@/models/Book';

// Fetch all books
export async function GET() {
  await connectToDatabase();
  const books = await Book.find();
  return NextResponse.json(books);
}

// Add a new book
export async function POST(req: Request) {
  const data = await req.json();
  await connectToDatabase();
  const newBook = await Book.create(data);
  return NextResponse.json(newBook, { status: 201 });
}
