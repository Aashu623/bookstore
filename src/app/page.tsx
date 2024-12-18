'use client'
import { useEffect, useState } from "react";
import bg from '../assets/bg.jpg'
import Image from "next/image";
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
      const response = await fetch('/api/books');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-orange-600">BookShelf</div>
        <div>
          <input
            type="text"
            placeholder="Search books, authors..."
            className="border border-gray-300 px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            My Account
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-100 to-white p-10 text-center">
        <h1 className="text-5xl font-bold text-orange-800 mb-4">
          Choose Your Brain Food
        </h1>
        <p className="text-gray-600 mb-6">
          SALES UP TO <span className="text-orange-600 font-bold">70% OFF</span>
        </p>
        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
          Explore More
        </button>
        <div className="mt-8 flex justify-center">
          <Image
            alt="Hero Image"
            src={bg}
            className="h-96 shadow-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white grid grid-cols-1 md:grid-cols-4 gap-6 text-center shadow">
        <div>
          <h3 className="font-semibold text-lg">Quick Delivery</h3>
          <p className="text-gray-500 text-sm">Fast and secure delivery at your door.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Secure Payment</h3>
          <p className="text-gray-500 text-sm">Trusted payment methods.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Best Quality</h3>
          <p className="text-gray-500 text-sm">We deliver only the best books.</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg">Return Guarantee</h3>
          <p className="text-gray-500 text-sm">Hassle-free returns within 30 days.</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-10 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">View All Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {books.map((book: Book) => (
            <div key={book._id} className='border border-gray-300 p-4'>
              <div className='flex justify-center w-full max-h-48 overflow-hidden'>
                <img src={book.image} alt="" className='w-32' />
              </div>
              <h3 className='text-md font-semibold text-gray-500'>{book.title}</h3>
              <p className='text-gray-500'>{book.author}</p>
              <p className='text-green-500'>{book.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Featured Books
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 px-4">
          {books.reverse().map((book: Book) => (
            <div key={book._id} className='border border-gray-300 p-4'>
              <div className='flex justify-center w-full max-h-48 overflow-hidden'>
                <img src={book.image} alt="" className='w-32' />
              </div>
              <h3 className='text-md font-semibold text-gray-500'>{book.title}</h3>
              <p className='text-gray-500'>{book.author}</p>
              <p className='text-green-500'>{book.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-700 text-white text-center py-4">
        <p>&copy; 2024 BookShelf. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
