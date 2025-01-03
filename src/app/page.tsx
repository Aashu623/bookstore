'use client'
import { useEffect, useState } from "react";
import bg from '@/assets/bg.jpg'
import Image from "next/image";
import { TbTruckDelivery } from "react-icons/tb";
import { GrSecure } from "react-icons/gr";
import { FaThumbsUp } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import { Button } from "@radix-ui/themes";
import BookCard from "@/components/BookCard";
import axios from "axios";



interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}
export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('/api/books');
      setBooks(response?.data?.books);
    };
    fetchBooks();
  }, []);
  return (
    <div className="bg-gray-100 text-gray-800">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-100 to-white p-4 md:p-10 text-center">
        <h1 className="text-5xl font-bold text-orange-800 mb-4">
          Choose Your Brain Food
        </h1>
        <p className="text-gray-600 mb-6">
          SALES UP TO <span className="text-orange-600 font-bold">70% OFF</span>
        </p>
        <Button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
          Explore More
        </Button>
        <div className="mt-8 flex justify-center">
          <Image
            alt="Hero Image"
            src={bg}
            className="h-96 shadow-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="p-4 md:p-10 bg-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow">
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-lg text-gray-600">Quick Delivery</h3>
          <TbTruckDelivery size={40} color="red" />
          <p className="text-gray-500 text-sm">Fast and secure delivery at your door.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-lg text-gray-600">Secure Payment</h3>
          <GrSecure size={40} color="red" />

          <p className="text-gray-500 text-sm">Trusted payment methods.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-lg text-gray-600">Best Quality</h3>
          <FaThumbsUp size={40} color="red" />

          <p className="text-gray-500 text-sm">We deliver only the best books.</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-lg text-gray-600">Return Guarantee</h3>
          <SiTicktick size={40} color="red" />
          <p className="text-gray-500 text-sm">Hassle-free returns within 30 days.</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="p-4 md:p-10 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books?.map((book: Book) => (
            <BookCard
              key={book._id}
              book={book}
              isAdmin={false}
            />
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="p-4 md:p-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Featured Books
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {books.reverse().map((book: Book) => (
            <BookCard
              key={book._id}
              book={book}
              isAdmin={false}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
