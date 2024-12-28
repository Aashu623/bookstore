import React from "react";
import { FaCartPlus } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
      <div className="text-2xl font-bold text-orange-600">BookShelf</div>
      <input
        type="text"
        placeholder="Search books, authors..."
        className="border border-gray-300 px-4 py-1 rounded-md w-full lg:w-1/2"
      />
      <FaCartPlus />
    </nav>
  );
}
