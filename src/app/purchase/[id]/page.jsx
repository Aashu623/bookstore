"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, Text, Flex, Box, Button } from "@radix-ui/themes";
import { toast } from "react-hot-toast";
import { QRCodeCanvas } from "qrcode.react";
import ConfirmDialog from "@/components/ConfirmDialog"; // Import the ConfirmDialog component

const PurchasePage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        const response = await fetch(`/api/books/${id}`);
        const data = await response.json();
        setBook(data);
      };
      fetchBook();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Payment logic here
    toast.success("Payment successful!");
  };

  const handleConfirmPurchase = async () => {
    setIsDialogOpen(false);
    toast.success("Your purchase is being processed.");

    const orderData = {
      user: customerDetails,
      book,
      paymentUrl: `https://paymentgateway.com/pay?amount=${book.price}&book=${book.title}`,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Order placed successfully!");
        router.push(`/track-order/${data.orderNumber}`);
      }
    } catch (error) {
      toast.error("An error occurred while placing the order.");
    }
  };

  if (!book) return <div>Loading...</div>;

  const paymentUrl = `https://paymentgateway.com/pay?amount=${book.price}&book=${book.title}`;

  return (
    <Flex gap="4" className="container mx-auto my-6" wrap={"wrap"}>
      {/* Left Section: Book Details */}
      <Box className="w-1/2">
        <Card className="p-4 shadow-md bg-gray-100">
          <img
            src={book.image}
            alt={book.title}
            className="w-full h-80 object-contain rounded-lg"
          />
          <Text size="lg" weight="bold" className="mt-4">
            {book.title}
          </Text>
          <Text size="sm" color="gray">
            by {book.author}
          </Text>
          <Text size="lg" weight="bold" color="black" className="mt-2">
            ${book.price}
          </Text>
        </Card>
      </Box>

      <Box className="w-1/2">
        <Card className="p-4 shadow-md bg-gray-100">
          <form onSubmit={handleSubmit}>
            <Text size="lg" weight="bold" className="mb-4">
              Enter Your Details
            </Text>

            <input
              name="name"
              placeholder="Full Name"
              value={customerDetails.name}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={customerDetails.email}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border"
            />
            <input
              name="address"
              placeholder="Shipping Address"
              value={customerDetails.address}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border"
            />
            <input
              name="paymentMethod"
              placeholder="Payment Method"
              value={customerDetails.paymentMethod}
              onChange={handleInputChange}
              className="w-full mb-4 p-2 border"
            />

            <Button
              variant="primary"
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="w-full mt-4"
            >
              Complete Purchase
            </Button>
          </form>
        </Card>
      </Box>

      <Box className="w-full mt-4">
        <Card className="p-4 shadow-md bg-gray-100 text-center">
          <Text size="lg" weight="bold" className="mb-4">
            Scan QR Code to Complete Payment
          </Text>
          <QRCodeCanvas value={paymentUrl} size={256} />{" "}
          {/* Display the QR code */}
        </Card>
      </Box>

      {/* Dialog for Confirming Purchase */}
      <ConfirmDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmPurchase}
      />
    </Flex>
  );
};

export default PurchasePage;
