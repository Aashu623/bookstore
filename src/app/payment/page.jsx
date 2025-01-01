"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function PaymentPage() {
  const [billingBooks, setBillingBooks] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [utrNumber, setUtrNumber] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const router = useRouter();
  const totalAmount =
    billingBooks.reduce((acc, book) => acc + book.price * book.quantity, 0) +
    deliveryCharges;

  const handleOrderSubmit = async () => {
    if (!utrNumber.trim()) {
      alert("Please enter a valid UTR number.");
      return;
    }

    const orderNumber = Math.floor(Math.random() * 90000) + 10000;

    const orderData = {
      orderNumber,
      books: billingBooks?.map((book) => book._id),
      user: {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
      },
      utrNumber,
      totalAmount:billingBooks.reduce((acc, book) => acc + book.price * book.quantity, 0) +
      deliveryCharges,
    };
    console.log(orderData);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error("Failed to create the order.");
      }

      console.log("Submitting order...", orderData);
      localStorage.removeItem("billingBooks");
      setBillingBooks([]);
      router.push(`/track-order?orderNumber=${orderNumber}`);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create the order.");
    }
  };

  const handlePhonePePayment = () => {
    const upiUrl = `upi://pay?pa=paytm.s16ad8f@paytm&pn=Your%20Store%20Name&tid=123456&txn=${totalAmount.toFixed(
      2
    )}&url=https://yourstore.com`;

    window.location.href = upiUrl;
  };

  useEffect(() => {
    const storedBillingBooks = localStorage.getItem("billingBooks") || "[]";
    const storedUserDetails = localStorage.getItem("userDetails");

    if (storedBillingBooks) {
      const books = JSON.parse(storedBillingBooks);
      setBillingBooks(books);

      const bookCount = books.length;
      if (bookCount <= 2) setDeliveryCharges(40);
      else if (bookCount <= 4) setDeliveryCharges(60);
      else setDeliveryCharges(80);
    }

    if (storedUserDetails) setUserDetails(JSON.parse(storedUserDetails));
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4">Billing Books</h2>
            {billingBooks?.map((book) => (
              <div
                key={book._id}
                className="border-b border-gray-200 py-4 flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-500">
                    Quantity: {book.quantity}
                  </p>
                </div>
                <p className="font-bold">${book.price}</p>
              </div>
            ))}
            <div className="mt-4">
              <p className="font-bold">Delivery Charges: ${deliveryCharges}</p>
              <p className="font-bold">
                Total Amount: ${totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            {userDetails ? (
              <div>
                <p>
                  <strong>Name:</strong> {userDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p>
                  <strong>Address:</strong> {userDetails.address}
                </p>
              </div>
            ) : (
              <p>No user details found.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <div className="flex justify-center mb-6">
            <img
              src="../../assets/bg.png"
              alt="QR Code"
              className="h-40 w-40"
            />
          </div>
          <p className="text-gray-700 mb-4">
            Scan this QR code and pay <strong>${totalAmount.toFixed(2)}</strong>
            .
          </p>
          <div className="mb-4">
            <label
              htmlFor="utrNumber"
              className="block text-gray-800 font-bold mb-2"
            >
              Enter UTR Number
            </label>
            <input
              type="text"
              id="utrNumber"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter UTR number"
            />
            <p className="text-sm text-gray-500 mt-1">
              Note: Enter the UTR number after completing the payment.
            </p>
          </div>
          <div className="mb-4">
            <button
              onClick={handlePhonePePayment}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Pay with PhonePe
            </button>
          </div>
          <button
            onClick={handleOrderSubmit}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
}
