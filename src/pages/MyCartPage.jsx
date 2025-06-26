import React from "react";
import Footer from "../components/footer";

const MyCartPage = () => {

const cartItems = [
  { id: 1, vendor: "Vendor 1", rating: 4, price: 250 },
  { id: 2, vendor: "Vendor 2", rating: 5, price: 400 },
  { id: 3, vendor: "Vendor 3", rating: 3, price: 150 },
];

  ;

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img
            src="../assets/planitlogo.png"
            alt="Logo"
            className="h-12"
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center space-x-6">
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Overview
          </button>
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Events
          </button>
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Attendees
          </button>
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Sponsors
          </button>
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Team
          </button>
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            Settings
          </button>
          <button className="text-gray-700 hover:text-blue-600 font-medium">
            New event
          </button>
          <button className="relative">
  <img
    src="../assets/shopping-cart.png"
    alt="Shopping Cart"
    className="h-12"
  />
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
    {cartItems.length}
  </span>
</button>

      </div>
      </header>

      {/* Cart Container */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Cart</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
<ul className="space-y-4">
  {cartItems.map((item) => (
    <li
      key={item.id}
      className="flex items-start justify-between border-b pb-4"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{item.vendor}</h3>
        <div className="flex items-center space-x-1 mt-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`h-4 w-4 ${
                index < item.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46 1.287 3.974c.3.922-.755 1.688-1.54 1.118L10 13.011l-3.387 2.413c-.784.57-1.838-.196-1.539-1.118l1.287-3.974-3.386-2.46c-.782-.57-.38-1.81.588-1.81h4.18L9.05 2.927z" />
            </svg>
          ))}
        </div>
      </div>
      <div className="text-right text-gray-700 font-semibold text-lg">
        ${item.price}
      </div>
    </li>
  ))}
</ul>

          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyCartPage;
