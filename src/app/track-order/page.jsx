"use client";

import React, { useState } from "react";
import { Card, Text, Flex, Box, Button } from "@radix-ui/themes";
import { toast } from "react-hot-toast";
import OrderCard from "@/components/OrderCard";
const TrackOrderPage = () => {
  const [enteredOrderNumber, setEnteredOrderNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch order details based on the entered order number
  const fetchOrder = async (orderNumber) => {
    setLoading(true);
    const response = await fetch(`/api/orders/${orderNumber}`);
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
      setOrder(null);
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  const handleOrderNumberChange = (e) => {
    setEnteredOrderNumber(e.target.value);
  };

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (enteredOrderNumber) {
      fetchOrder(enteredOrderNumber);
    } else {
      toast.error("Please enter a valid order number.");
    }
  };

  return (
    <Flex gap="4" className="container mx-auto my-6" direction={"column"}>
      <Box className="w-full sm:w-1/2">
        <Card className="p-4 shadow-md bg-gray-100">
          <Text size="lg" weight="bold" className="mb-4">
            Track Your Order
          </Text>
          <form onSubmit={handleTrackOrder}>
            <input
              placeholder="Enter Order Number"
              value={enteredOrderNumber}
              onChange={handleOrderNumberChange}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <Button type="submit" variant="primary" className="w-full">
              Track Order
            </Button>
          </form>
        </Card>
      </Box>

      {order && (
        <Box className="w-full sm:w-1/2 mt-6 sm:mt-0">
          <OrderCard order={order} />
        </Box>
      )}

      {loading && (
        <Box className="w-full sm:w-1/2 mt-6 sm:mt-0">
          <Card className="p-4 shadow-md bg-gray-100">
            <Text size="lg" weight="bold" className="text-center">
              Loading...
            </Text>
          </Card>
        </Box>
      )}
    </Flex>
  );
};

export default TrackOrderPage;
