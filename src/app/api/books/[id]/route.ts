import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Book } from '@/models/Book';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  await connectToDatabase();
  const updatedBook = await Book.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updatedBook);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  await Book.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Book deleted successfully' });
}
