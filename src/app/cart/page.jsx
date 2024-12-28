'use client';

import { useEffect, useState } from 'react';
import { Button, Flex } from '@radix-ui/themes';


export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      calculateTotal(parsedCart);
    }
  }, []);

  // Calculate the total price of the cart
  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Handle checkout action
  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Proceeding to checkout with the following items:', cartItems);
  };

  // Handle removing an item from the cart
  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Your Cart</h1>

      {/* Cart Items */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((book) => (
            <div key={book._id} className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 flex flex-col items-center">
              {/* Book Image */}
              <img src={book.image} alt={book.title} className="h-48 object-contain" />

              {/* Book Details */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
                <p className="text-sm text-gray-500">by {book.author}</p>
                <p className="mt-2 text-lg font-bold text-gray-800">${book.price}</p>
                <p className="mt-1 text-sm text-gray-500">Quantity: {book.quantity}</p>

                {/* Remove from Cart Button */}
                <Button
                  variant="outline"
                  className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
                  onClick={() => handleRemoveFromCart(book._id)}
                >
                  Remove from Cart
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary */}
      <Flex direction="column" className="mt-8 p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Cart Summary</h2>
        <p className="mt-4 text-lg font-semibold text-gray-800">Total: ${totalPrice.toFixed(2)}</p>

        {/* Checkout Button */}
        <Button
          className="mt-6 w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </Flex>
    </div>
  );
}
