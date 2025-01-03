"use client";

import React from "react";
import { Flex, Box, Button, Text } from "@radix-ui/themes";

const OrderCard = ({
  order,
  onUpdateStatus,
  onDeleteOrder,
  isAdmin = false,
}) => {
  console.log(order);
  return (
    <Flex
      direction={"column"}
      className="p-4 shadow-md bg-gray-100 w-full max-w-md mx-auto"
    >
      {/* Order Details */}
      <Flex className="mb-4" direction={"column"}>
        <Text size="lg" weight="bold" color="black">
          {`Order #${order.orderNumber}`}
        </Text>
        <Text size="md" color="gray" className="mt-2">
          Status:{" "}
          <Text
            as="span"
            color={order.status === "Completed" ? "green" : "red"}
          >
            {order.status}
          </Text>
        </Text>
      </Flex>

      {isAdmin && (
        <Flex gap="3" justify="end">
          <Button
            size="lg"
            variant="soft"
            color="green"
            onClick={() => onUpdateStatus(order.orderNumber, "Completed")}
          >
            Mark as Completed
          </Button>
          <Button
            size="lg"
            variant="soft"
            color="red"
            onClick={() => onDeleteOrder(order.orderNumber)}
          >
            Delete Order
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default OrderCard;
