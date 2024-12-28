"use client";

import React, { useState, useEffect } from "react";
import { Card, Text, Button, Box, Flex } from "@radix-ui/themes";
import { toast } from "react-hot-toast";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders`);
      const data = await response.json();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderNumber, newStatus) => {
    const response = await fetch(`/api/orders/${orderNumber}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Order status updated successfully");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderNumber === orderNumber ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  const handleDeleteOrder = async (orderNumber) => {
    const response = await fetch(`/api/orders/${orderNumber}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success("Order deleted successfully");
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.orderNumber !== orderNumber)
      );
    }
  };

  return (
    <Flex gap="4" className="container mx-auto my-6">
      {orders.map((order) => (
        <Box key={order.orderNumber} className="w-full">
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
            <Flex gap="2" className="mt-4">
              <Button variant="primary" onClick={() => handleUpdateStatus(order.orderNumber, "Completed")}>
                Mark as Completed
              </Button>
              <Button variant="danger" onClick={() => handleDeleteOrder(order.orderNumber)}>
                Delete Order
              </Button>
            </Flex>
          </Card>
        </Box>
      ))}
    </Flex>
  );
};

export default AdminOrdersPage;
