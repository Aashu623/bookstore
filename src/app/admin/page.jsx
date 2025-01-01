"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, Flex, Box, Button, Text } from "@radix-ui/themes";

const AdminPanel = () => {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="container mx-auto my-8"
      gap="6"
    >
      {/* Page Title */}
      <Flex direction={"column"}>
        <Text size="5" weight="bold" color="black" className="text-center">
          Admin Panel
        </Text>
        <Text size="3" color="gray" className="text-center mt-2">
          Manage books and orders efficiently
        </Text>
      </Flex>

      {/* Buttons Section */}
      <Flex
        gap="4"
        wrap="wrap"
        className="w-full sm:w-2/3 lg:w-1/2 justify-center"
      >
        <Button
          size="lg"
          variant="soft"
          color="blue"
          className="w-full"
          as="div"
          onClick={() => router.push("/admin/books")}
        >
          Manage Books
        </Button>
        <Button
          size="lg"
          variant="soft"
          color="green"
          className="w-full"
          as="div"
          onClick={() => router.push("/admin/orders")}
        >
          Manage Orders
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminPanel;
