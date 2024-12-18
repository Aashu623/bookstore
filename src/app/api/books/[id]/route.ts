// import { NextRequest, NextResponse } from "next/server";
// import connectToDatabase from "@/lib/mongodb";
// import { Book } from "@/models/Book";

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ): Promise<NextResponse> {
//   try {
//     const data = await req.json();
//     await connectToDatabase();

//     const updatedBook = await Book.findByIdAndUpdate(params.id, data, {
//       new: true,
//     });

//     if (!updatedBook) {
//       return NextResponse.json({ error: "Book not found" }, { status: 404 });
//     }

//     return NextResponse.json(updatedBook);
//   } catch (error) {
//     console.error("Error updating book:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   await connectToDatabase();
//   await Book.findByIdAndDelete(params.id);
//   return NextResponse.json({ message: "Book deleted successfully" });
// }
