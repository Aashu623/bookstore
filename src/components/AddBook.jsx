'use client';

import { useState } from 'react';

export default function AddBook() {
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Book added successfully!');
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
      } else {
        setMessage('Failed to add book.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error occurred. Try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">Add a New Book</h1>
      {message && (
        <div className="mb-4 text-green-600 font-medium">{message}</div>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-gray-700 font-medium">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Enter language"
            required
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-gray-700 font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="Enter price"
            required
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-gray-700 font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            required
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
          />
        </div>

        {/* Image URL */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
          />
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Enter book description"
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:outline-orange-600"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
