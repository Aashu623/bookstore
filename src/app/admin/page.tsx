'use client';

import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    price: number;
    stock: number;
    image: string;
}
export default function AdminPage() {
    const [books, setBooks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        language: '',
        author: '',
        description: '',
        price: '',
        stock: '',
        image: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Book added successfully!');
                fetchBooks();
                setFormData({
                    title: '',
                    category: '',
                    language: '',
                    author: '',
                    description: '',
                    price: '',
                    stock: '',
                    image: '',
                });
                setIsOpen(false);
            } else {
                setMessage('Failed to add book.');
            }
        } catch (error) {
            console.error(error);
            setMessage('Error occurred. Try again.');
        }
    };

    const fetchBooks = async () => {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);
    const deleteBook = async (id: string) => {
        await fetch(`/api/books/${id}`, {
            method: 'DELETE',
        });
        fetchBooks();
    };
    const updateBook = async (book: Book) => {
        await fetch(`/api/books/${book._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: 'Updated Book',
                author: 'John Doe',
                description: 'A new book',
                price: 9.99,
                stock: 10,
                image: 'https://via.placeholder.com/150',
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
    return (
        <section className="py-10 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">View All Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 p-2">
                {books.map((book: Book) => (
                    <div key={book._id} className='border border-gray-300 rounded-md p-2 relative'>
                        <div className='flex justify-center w-full max-h-48 overflow-hidden'>
                            <img src={book.image} alt="" className='w-32 hover:absolute hover:h-full hover:w-full transition-all' />
                        </div>
                        <h3 className='text-md font-semibold text-gray-500'>{book.title}</h3>
                        <p className='text-gray-500'>{book.author}</p>
                        <p className='text-green-500'>{book.price}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setIsOpen(true)}><IoMdAddCircleOutline />Add</button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-md max-h-[600px] overflow-auto sm:max-w-4xl w-full">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-orange-600">Add New Book</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                ✖
                            </button>
                        </div>

                        {/* Success/Error Message */}
                        {message && (
                            <div className="mb-4 text-green-600 font-medium">{message}</div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Title */}
                            <div>
                                <label className="block text-gray-700 font-medium">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Enter book title"
                                    required
                                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-gray-700 font-medium">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={(e) => handleChange(e)}
                                    required
                                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="PSC">Novels</option>
                                    <option value="PSC">PSC</option>
                                    <option value="SSC">SSC</option>
                                    <option value="UGC NET">UGC NET</option>
                                </select>
                            </div>

                            {/* Language */}
                            <div>
                                <label className="block text-gray-700 font-medium">Language</label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={(e) => handleChange(e)}
                                    required
                                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                                >
                                    <option value="" disabled>Select language</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="English">English</option>
                                </select>
                            </div>

                            {/* Author */}
                            <div>
                                <label className="block text-gray-700 font-medium">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Enter author name"
                                    required
                                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-gray-700 font-medium">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Enter price"
                                    required
                                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                                />
                            </div>

                            {/* Image URL */}
                            <div className="col-span-1 sm:col-span-2">
                                <label className="block text-gray-700 font-medium">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Enter image URL"
                                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                                />
                            </div>

                            {/* Description */}
                            <div className="col-span-1 sm:col-span-2">
                                <label className="block text-gray-700 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => handleChange(e)}
                                    rows={4}
                                    placeholder="Enter book description"
                                    className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="col-span-1 sm:col-span-2">
                                <button
                                    type="submit"
                                    className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
                                >
                                    Add Book
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}
        </section >
    );
}
