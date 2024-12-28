"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, Text, Flex, Box, Button } from "@radix-ui/themes";
import { toast } from "react-hot-toast";

const TrackOrderPage = () => {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${orderNumber}`);
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setOrder(data);
      }
    };
    fetchOrder();
  }, [orderNumber]);

  if (!order) return <div>Loading...</div>;

  return (
    <Flex gap="4" className="container mx-auto my-6">
      <Box className="w-full">
        <Card className="p-4 shadow-md bg-gray-100">
          <Text size="lg" weight="bold">{`Order #${order.orderNumber}`}</Text>
          <Text size="md" className="mt-2">
            Status: {order.status}
          </Text>
          <Text size="md" className="mt-2">
            Book: {order.book.title} by {order.book.author}
          </Text>
          <Text size="md" className="mt-2">
            Price: ${order.book.price}
          </Text>
        </Card>
      </Box>
    </Flex>
  );
};

export default TrackOrderPage;
