"use client";

import React from "react";
import { Flex, Text, Card, Box } from "@radix-ui/themes";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Card className="bg-orange-600 text-black py-8">
      <Flex
        direction="column"
        align="center"
        justify="center"
        className="container mx-auto gap-6"
      >
        <Flex justify="center" wrap="wrap" className="text-center gap-4 mb-6">
          <Text
            size="md"
            color="white"
            className="cursor-pointer hover:underline"
          >
            Home
          </Text>
          <Text
            size="md"
            color="white"
            className="cursor-pointer hover:underline"
          >
            Books
          </Text>
          <Text
            size="md"
            color="white"
            className="cursor-pointer hover:underline"
          >
            Track Order
          </Text>
          <Text
            size="md"
            color="white"
            className="cursor-pointer hover:underline"
          >
            Contact
          </Text>
        </Flex>

        <Flex gap="4" justify="center">
          <Box
            as="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-blue-500 transition-colors"
          >
            <FaFacebook size="24" />
          </Box>
          <Box
            as="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-blue-400 transition-colors"
          >
            <FaTwitter size="24" />
          </Box>
          <Box
            as="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-pink-400 transition-colors"
          >
            <FaInstagram size="24" />
          </Box>
          <Box
            as="a"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer hover:text-blue-600 transition-colors"
          >
            <FaLinkedin size="24" />
          </Box>
        </Flex>

        {/* Copyright Notice */}
        <Text size="sm" color="gray-400" className="text-center mt-4">
          &copy; {new Date().getFullYear()} Dream Achievers group. All Rights Reserved.
        </Text>
      </Flex>
    </Card>
  );
};

export default Footer;
