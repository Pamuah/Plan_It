import React, { useState } from "react";
import Footer from "../components/footer";

const MyCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wedding Package",
      description:
        "Complete wedding planning with venue, catering & photography",
      originalPrice: 3200,
      price: 2850,
      guestCount: "150",
      date: "June 15, 2025",
      location: "Grand Plaza Hotel",
      image: "https://placehold.co/80x80?text=Wedding",
    },
    {
      id: 2,
      name: "Corporate Summit Experience",
      description: "Full-day conference with AV, catering & speaker management",
      originalPrice: 2500,
      price: 2100,
      guestCount: "200",
      date: "July 10, 2025",
      location: "City Convention Center",
      image: "https://placehold.co/80x80?text=Corporate",
    },
    {
      id: 3,
      name: "Birthday Bash Package",
      description:
        "Complete birthday party setup with decorations, cake & entertainment",
      originalPrice: 1200,
      price: 999,
      guestCount: "50",
      date: "August 5, 2025",
      location: "Garden Villa",
      image: "https://placehold.co/80x80?text=Birthday",
    },
  ]);

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price),
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleApplyCoupon = () => {
    alert("Coupon applied (demo)");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="text-2xl font-bold text-gray-800">Planit</div>
        <div className="flex items-center space-x-6">
          <button className="text-gray-700 hover:text-blue-500 font-medium text-sm">
            Overview
          </button>
          <button className="text-gray-700 hover:text-blue-500 font-medium text-sm">
            Events
          </button>
          <button className="text-gray-700 hover:text-blue-500 font-medium text-sm">
            Attendees
          </button>
          <button className="text-gray-700 hover:text-blue-500 font-medium text-sm">
            Sponsors
          </button>
          <button className="text-gray-700 hover:text-blue-500 font-medium text-sm">
            Team
          </button>
          <button className="text-gray-700 hover:text-blue-500 font-medium text-sm">
            Settings
          </button>
          <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition">
            New event
          </button>
          <button className="relative">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartItems.length}
            </span>
          </button>
        </div>
      </header>

      {/* Cart Page Content */}
      <main className="px-6 py-8 max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
              1
            </span>
            <span className="ml-2 text-sm font-medium text-blue-500">Cart</span>
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">
              2
            </span>
            <span className="ml-2 text-sm text-gray-500">Checkout</span>
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="flex items-center">
            <span className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold">
              3
            </span>
            <span className="ml-2 text-sm text-gray-500">Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg">Your cart is empty</p>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-600 transition">
                  Browse Events
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-5">
                    <div className="flex gap-4">
                      {/* Event Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover bg-gray-100 flex-shrink-0 rounded-lg"
                      />

                      {/* Event Details */}
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-base">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 truncate">
                          {item.description}
                        </p>
                        <div className="mt-2 text-sm">
                          <span className="text-gray-500">Guest count: </span>
                          <span className="font-bold text-gray-900">
                            {item.guestCount}
                          </span>{" "}
                          •<span className="text-gray-500">Date: </span>
                          <span className="font-bold text-gray-900">
                            {item.date}
                          </span>{" "}
                          •<span className="text-gray-500">Location: </span>
                          <span className="font-bold text-gray-900">
                            {item.location}
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="text-lg font-bold text-gray-900">
                            ${item.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex justify-end items-center border-t border-gray-200 pt-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => console.log("Edit item")}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:w-96 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white p-6 border border-gray-200 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-blue-500">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-6 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition shadow-sm">
                  Proceed to Checkout
                </button>
                <div className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyCartPage;
