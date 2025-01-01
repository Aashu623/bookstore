"use client";

import { useEffect, useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    building: "",
    street: "",
    area: "",
    city: "",
    pincode: "",
  });
  const router = useRouter();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
        setSelectedItems(parsedCart.map((item) => item._id));
      }
    } catch (error) {
      console.error("Failed to fetch cart from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    const selectedBooks = cartItems.filter((item) =>
      selectedItems.includes(item._id)
    );
    const total = selectedBooks.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [selectedItems, cartItems]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const address = `${userDetails.building}, ${userDetails.street}, ${userDetails.area}, ${userDetails.city}, ${userDetails.pincode}`;
    const updatedUserDetails = { ...userDetails, address };

    localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails));
    const billingBooks = cartItems.filter((item) =>
      selectedItems.includes(item._id)
    );
    localStorage.setItem("billingBooks", JSON.stringify(billingBooks));
    router.push("/payment");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
        <div className="grid gap-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(book._id)}
                  onChange={() => handleCheckboxChange(book._id)}
                />
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-24 w-16 object-cover"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-sm text-gray-500">by {book.author}</p>
                  <p className="text-gray-800 font-bold">${book.price}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {book.quantity}
                  </p>
                </div>
                <Button
                  variant="soft"
                  color="red"
                  onClick={() => handleRemoveFromCart(book._id)}
                >
                  Remove
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Details</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="name" className="block ">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block ">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block ">
              phone
            </label>
            <input
              id="phone"
              name="phone"
              type="phone"
              value={userDetails.phone}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>
          <div>
            <label htmlFor="building" className="block ">
              Building/Flat
            </label>
            <input
              id="building"
              name="building"
              value={userDetails.building}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>
          <div>
            <label htmlFor="street" className="block ">
              Street/Colony
            </label>
            <input
              id="street"
              name="street"
              value={userDetails.street}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>
          <div>
            <label htmlFor="area" className="block ">
              Area Nearby
            </label>
            <input
              id="area"
              name="area"
              value={userDetails.area}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>
          <div>
            <label htmlFor="city" className="block ">
              City
            </label>
            <input
              id="city"
              name="city"
              value={userDetails.city}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block ">
              Pincode
            </label>
            <input
              id="pincode"
              name="pincode"
              value={userDetails.pincode}
              onChange={handleInputChange}
              required
              className="w-full border rounded px-3 py-1"
            />
          </div>
          <p className="mt-2 text-lg font-bold">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <Button
            className="mt-4 bg-orange-600 text-white hover:bg-orange-700"
            type="submit"
          >
            Proceed to Payment
          </Button>
        </form>
      </div>
    </div>
  );
}
