"use client";

import React from "react";
import { Flex, Card, Text, Button, Box } from "@radix-ui/themes";
import AddOrUpdateBook from "@/components/AddOrUpdateBook";
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation'

// import { Book } from '@/models/Book';

// interface BookCardProps {
//   title: string;
//   isAdmin?: boolean;
//   author: string;
//   price: number;
//   image: string;
//   onBuy?: () => void;
//   onAddToCart?: (book: Partial<Book>) => void;
//   handleUpdate?: (book: Partial<Book>) => void;
//   handleDelete?: (id: string) => void;
//   id: string;
// }

export default function BookCard({ book, isAdmin = false }) {
  const router = useRouter();
  const handleBuy = () => {
    console.log(book);
    router.push(`/purchase/${book._id}`);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    toast.success("Book deleted successfully!");
  };
  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const existingBookIndex = cartItems.findIndex(
      (item) => item._id === book._id
    );

    if (existingBookIndex >= 0) {
      cartItems[existingBookIndex].quantity += 1;
    } else {
      cartItems.push({ ...book, quantity: 1 });
    }
    console.log(cartItems);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    toast.success("Book added to cart successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await onSubmit(formData);
      if (response.ok) {
        toast.success(
          `${isUpdate ? "Book updated" : "Book added"} successfully!`
        );
        if (!isUpdate) {
          setFormData({
            title: "",
            category: "",
            language: "",
            author: "",
            description: "",
            price: "",
            stock: "",
            image: "",
          });
        }
      } else {
        toast.error(`Failed to ${isUpdate ? "update" : "add"} book.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      variant="ghost"
      className="max-w-sm w-full border flex flex-col items-center p-4 shadow-md hover:shadow-lg bg-gray-100"
    >
      <Box className="h-48 w-full">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-contain rounded-lg"
        />
      </Box>

      <Flex direction="column" align="center" gap="2" className="mt-4 w-full">
        <Text size="4" weight="bold" truncate>
          {book.title}
        </Text>
        <Text size="3" color="gray">
          by {book.author}
        </Text>
        <Text size="2" weight="bold" color="black">
          Rs.{" "}{book.price}
        </Text>

        <Flex gap="2" className="mt-4">
          {isAdmin ? (
            <>
              <AddOrUpdateBook
                isUpdate={true}
                initialData={book}
                onSubmit={handleSubmit}
              />
              <Button variant="danger" onClick={() => handleDelete(book._id)}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" onClick={handleBuy}>
                Buy
              </Button>
              <Button variant="secondary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
