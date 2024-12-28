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
        <Link href="/admin" className="text-gray-700 hover:text-orange-600">
          Admin Panel
        </Link>
        <FaCartPlus className="text-gray-700 hover:text-orange-600 cursor-pointer" />
      </div>

      {/* Mobile Dropdown Menu */}
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="sm:hidden p-2 rounded-md text-gray-700 hover:text-orange-600 text-lg">
            ☰
          </button>
        </Popover.Trigger>
        <Popover.Content
          side="bottom"
          align="start"
          className="bg-white shadow-md p-4 rounded-md"
        >
          <div className="flex flex-col gap-2">
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
            <Link
              href="/contact"
              className="text-gray-700 hover:text-orange-600"
            >
              Contact
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-orange-600">
              <FaCartPlus />
            </Link>
          </div>
        </Popover.Content>
      </Popover.Root>
    </nav>
  );
}
