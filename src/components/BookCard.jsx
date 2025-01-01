"use client";

import React from "react";
import { Flex, Text, Button, Box, Card } from "@radix-ui/themes";
import AddOrUpdateBook from "@/components/AddOrUpdateBook";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BookCard({ book, isAdmin = false }) {
  const router = useRouter();
  const handleBuy = () => {
    handleAddToCart();
    router.push(`/cart`);
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

  return (
    <Card className="max-w-sm w-full border flex flex-col items-center shadow-md hover:shadow-lg bg-gray-100 rounded-sm py-4">
      <Box className="h-48 w-full">
        <img
          src={book.image}
          alt={book.title}
          className="h-full w-full object-cover border hover:scale-105 transition-all ease-in-out rounded-lg"
        />
      </Box>
      <Flex direction="column" align="center" className="mt-4 w-full">
        <Text size="3" weight="bold" className="max-w-48 truncate">
          {book.title}
        </Text>
        <Text size="2" color="gray">
          by {book.author}
        </Text>
        <Text size="2" weight="bold" color="black">
          <Text
            color="gray"
            weight={"normal"}
            size={"1"}
            className="line-through"
          >
            Rs. {book.price + 50}{" "}
          </Text>
          Rs. {book.price}
        </Text>

        <Flex gap="2" className="mt-1">
          {isAdmin ? (
            <>
              <AddOrUpdateBook isUpdate={true} initialData={book} />
              <Button
                variant="soft"
                color="red"
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button variant="soft" color="green" onClick={handleBuy}>
                Buy
              </Button>
              <Button variant="soft" color="orange" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
