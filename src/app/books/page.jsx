"use client";

import { useEffect, useState } from "react";
import { Grid, Separator } from "@radix-ui/themes";
import BookCard from "@/components/BookCard";
import Navbar from "@/components/Navbar";

export default function BooksPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        All books
      </h1>
      <Separator className="mb-6" />

      <Grid gap="6" columns={{ xs: "2", sm: "3", md: "4", lg: "5", xl: "6" }}>
        {books.map((book) => (
          <BookCard key={book?._id} book={book} isAdmin={false} />
        ))}
      </Grid>
    </div>
  );
}
