'use client';

import { useEffect, useState } from 'react';
interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}
export default function BooksPage() {
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
        <div>
            <h1 className='text-3xl font-mono font-semibold text-gray-500 text-center my-4'>Manage Books</h1>
            <div className='grid grid-cols-5 w-5/6 mx-auto gap-5'>
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
        </div>
    );
}
