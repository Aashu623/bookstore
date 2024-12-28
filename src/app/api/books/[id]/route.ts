import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Book } from "@/models/Book";

export async function GET(req: Request) {
  try {
    const id = req.url.split("/").reverse()[0];
    await connectToDatabase();
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const id = req.url.split("/").reverse()[0];
    const data = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing book ID" }, { status: 400 });
    }

    await connectToDatabase();

    const updatedBook = await Book.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const id = req.url.split("/").reverse()[0];
    if (!id) {
      return NextResponse.json({ error: "Missing book ID" }, { status: 400 });
    }

    await connectToDatabase();

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
