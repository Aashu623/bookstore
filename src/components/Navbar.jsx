import React from "react";
import { FaCartPlus } from "react-icons/fa";
import * as Popover from "@radix-ui/react-popover";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      {/* Brand Logo */}
      <div className="text-2xl font-bold text-orange-600">
        <Link href="/">BookShelf</Link>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search books, authors..."
        className="border border-gray-300 px-4 py-1 rounded-md w-full lg:w-1/2"
      />

      {/* Desktop Navigation Links */}
      <div className="hidden sm:flex gap-4">
        <Link href="/" className="text-gray-700 hover:text-orange-600">
          Home
        </Link>
        <Link href="/books" className="text-gray-700 hover:text-orange-600">
          Books
        </Link>
        <Link
          href="/track-order"
          className="text-gray-700 hover:text-orange-600"
        >
          Track Order
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-orange-600">
          Contact
        </Link>
        <FaCartPlus className="text-gray-700 hover:text-orange-600 cursor-pointer" />
      </div>

      {/* Mobile Navigation Menu */}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            aria-label="Menu"
            className="sm:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 text-lg"
          >
            ☰
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            align="center"
            className="bg-white shadow-lg rounded-md p-4 w-56"
          >
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-700 hover:text-orange-600">
                Home
              </Link>
              <Link
                href="/books"
                className="text-gray-700 hover:text-orange-600"
              >
                Books
              </Link>
              <Link
                href="/track-order"
                className="text-gray-700 hover:text-orange-600"
              >
                Track Order
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-orange-600"
              >
                Contact
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 text-gray-700 hover:text-orange-600"
              >
                <FaCartPlus /> Cart
              </Link>
            </div>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </nav>
  );
}
