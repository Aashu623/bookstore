"use client";

import React, { useState, useEffect } from "react";
import { Box, Flex } from "@radix-ui/themes";
import { toast } from "react-hot-toast";
import OrderCard from "@/components/OrderCard";

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
          order.orderNumber === orderNumber
            ? { ...order, status: newStatus }
            : order
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
    <Flex gap="4" className="container mx-auto my-6" wrap={"wrap"}>
      {orders.map((order) => (
        <Box key={order.orderNumber} className="w-full">
          <OrderCard
            order={order}
            key={order.orderNumber}
            onUpdateStatus={handleUpdateStatus}
            onDeleteOrder={handleDeleteOrder}
            isAdmin={true}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default AdminOrdersPage;
