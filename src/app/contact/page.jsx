"use client";

import React from "react";
import { Card, Text, Flex, Box } from "@radix-ui/themes";

const ContactPage = () => {
  const email = "contact@dreamachievers.com";
  const phoneNumber = "+91 9244955175";

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="container mx-auto my-8"
      gap="6"
    >
      <Card className="p-6 shadow-md bg-gray-100 w-full max-w-md text-center">
        <Text size="lg" weight="bold" className="mb-4">
          Contact Us
        </Text>

        {/* Email Section */}
        <Box className="mb-6">
          <Text size="md" color="black">
            Email:{" "}
          </Text>
          <Text
            size="3"
            weight="bold"
            color="blue"
            className="cursor-pointer underline"
            onClick={handleEmailClick}
          >
            {email}
          </Text>
        </Box>

        <Box>
          <Text size="md" color="black">
            Phone:{" "}
          </Text>
          <Text
            size="3"
            weight="bold"
            color="blue"
            className="cursor-pointer underline"
            onClick={handlePhoneClick}
          >
            {phoneNumber}
          </Text>
        </Box>
      </Card>
    </Flex>
  );
};

export default ContactPage;
