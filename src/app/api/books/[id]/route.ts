// import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
// import { Book } from '@/models/Book';

export async function PUT(req: Request) {
  const data = await req.json();
  console.log(data);
  // await connectToDatabase();
  // const updatedBook = await Book.findByIdAndUpdate(params.id, data, { new: true });
  // return NextResponse.json(updatedBook);
}

export async function DELETE(req: Request) {
  await connectToDatabase();
  console.log(req);
  // await Book.findByIdAndDelete(params.id);
  // return NextResponse.json({ message: 'Book deleted successfully' });
}
