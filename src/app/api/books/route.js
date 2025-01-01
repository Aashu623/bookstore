import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Book } from "@/models/Book";

export async function GET(req) {
  const { search, categories, language, minPrice, maxPrice, page = 1, limit = 10 } = Object.fromEntries(
    new URL(req.url).searchParams
  );

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);

  await connectToDatabase();

  const query = {
    ...(search && { title: { $regex: search, $options: "i" } }),
    ...(categories && { category: { $in: categories.split(",") } }),
    ...(language && { language: { $in: language.split(",") } }),
    price: { $gte: minPrice || 0, $lte: maxPrice || 1000 },
  };

  const skip = (pageNum - 1) * limitNum;

  const books = await Book.find(query)
    .skip(skip)
    .limit(limitNum);

  const totalBooks = await Book.countDocuments(query);

  const totalPages = Math.ceil(totalBooks / limitNum);

  return NextResponse.json({
    books,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalBooks,
      limit: limitNum,
    },
  });
}


export async function POST(req) {
  const data = await req.json();
  await connectToDatabase();
  const newBook = await Book.create(data);
  return NextResponse.json(newBook, { status: 201 });
}
