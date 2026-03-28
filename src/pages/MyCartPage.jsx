import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Footer from "../components/footer";

const MyCartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, vendor: "Vendor 1", rating: 4, price: 250 },
    { id: 2, vendor: "Vendor 2", rating: 5, price: 400 },
    { id: 3, vendor: "Vendor 3", rating: 3, price: 150 },
  ]);

  const [filters, setFilters] = useState({
    category: "",
    budgetRange: "",
    guestCount: "",
    date: "",
    location: "",
  });

  const [selectedTab, setSelectedTab] = useState("details");
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [guestCount, setGuestCount] = useState(50);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  // Event packages data
  const eventPackages = [
    {
      id: 1,
      name: "Corporate Conference Premium",
      category: "Conference",
      bookedCount: 45,
      guestCapacity: 200,
      price: 2500,
      image: "🏢",
      rating: 4.8,
      description: "Complete conference setup with audio/visual equipment",
    },
    {
      id: 2,
      name: "Wedding Elegance",
      category: "Wedding",
      bookedCount: 120,
      guestCapacity: 300,
      price: 3500,
      image: "💒",
      rating: 4.9,
      description: "Full wedding package with catering and decoration",
    },
    {
      id: 3,
      name: "Birthday Bash",
      category: "Birthday",
      bookedCount: 85,
      guestCapacity: 150,
      price: 1200,
      image: "🎉",
      rating: 4.7,
      description: "Fun birthday party with games and entertainment",
    },
    {
      id: 4,
      name: "Corporate Retreat",
      category: "Corporate",
      bookedCount: 65,
      guestCapacity: 250,
      price: 5000,
      image: "🏢",
      rating: 4.6,
      description: "Multi-day corporate retreat with team activities",
    },
    {
      id: 5,
      name: "Intimate Party",
      category: "Party",
      bookedCount: 35,
      guestCapacity: 100,
      price: 800,
      image: "🎊",
      rating: 4.5,
      description: "Cozy party setup for small gatherings",
    },
    {
      id: 6,
      name: "Festival Experience",
      category: "Party",
      bookedCount: 200,
      guestCapacity: 500,
      price: 8000,
      image: "🎪",
      rating: 4.9,
      description: "Large-scale festival with entertainment and food",
    },
  ];

  const addOns = [
    { id: 1, name: "Catering", price: 500 },
    { id: 2, name: "Photography", price: 300 },
    { id: 3, name: "Decoration", price: 200 },
    { id: 4, name: "Entertainment", price: 400 },
    { id: 5, name: "Lighting", price: 250 },
    { id: 6, name: "Sound System", price: 350 },
  ];

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const applyFilters = () => {
    console.log("Filters applied:", filters);
  };

  const addToCart = (packageItem) => {
    setCartItems([...cartItems, packageItem]);
  };

  const toggleAddOn = (addOnId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId],
    );
  };

  // Filter packages based on selected filters
  const filteredPackages = eventPackages.filter((pkg) => {
    if (filters.category && pkg.category !== filters.category) return false;
    return true;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img src="../assets/planitlogo.png" alt="Logo" className="h-12" />
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

      {/* Main Content Area */}
      <main className="px-6 py-8 pt-24 ml-80">
        <div className="flex gap-6">
          {/* Left Sidebar - Filters */}
          <aside className="fixed top-24 left-0 z-40 w-64 bg-white shadow-md p-6 h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Filters
            </h3>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Conference">Conference</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate</option>
                <option value="Birthday">Birthday</option>
                <option value="Party">Party</option>
              </select>
            </div>

            {/* Budget Range Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                value={filters.budgetRange}
                onChange={(e) =>
                  handleFilterChange("budgetRange", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Budgets</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-3000">$1,000 - $3,000</option>
                <option value="3000-5000">$3,000 - $5,000</option>
                <option value="5000+">$5,000+</option>
              </select>
            </div>

            {/* Guest Count Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guest Count
              </label>
              <input
                type="text"
                placeholder="e.g., 50-100"
                value={filters.guestCount}
                onChange={(e) =>
                  handleFilterChange("guestCount", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange("date", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location Filter */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                placeholder="City or venue"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Apply Button */}
            <button
              onClick={applyFilters}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Apply Filters
            </button>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1">
            {/* Promotional Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Featured Packages</h2>
                  <p className="text-blue-100 mb-4">
                    Discover our most popular event packages with exclusive
                    early-bird pricing
                  </p>
                  <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg transition duration-200">
                    Explore New Arrivals
                  </button>
                </div>
                <div className="text-6xl">🎯</div>
              </div>
            </div>

            {/* Event Packages Grid */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Available Packages
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedPackageId(pkg.id)}
                  >
                    {/* Package Image */}
                    <div className="bg-gray-200 h-40 flex items-center justify-center text-6xl">
                      {pkg.image}
                    </div>

                    {/* Package Info */}
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {pkg.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {pkg.category}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center space-x-1 mb-3">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-medium text-gray-700">
                          {pkg.rating}
                        </span>
                      </div>

                      {/* Booked Count */}
                      <p className="text-sm text-gray-600 mb-2">
                        📊 {pkg.bookedCount} bookings | {pkg.guestCapacity}{" "}
                        capacity
                      </p>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4">
                        {pkg.description}
                      </p>

                      {/* Price and Button */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-2xl font-bold text-gray-900">
                          ${pkg.price}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(pkg);
                          }}
                          className="group relative inline-flex items-center justify-center px-3 py-3 rounded-full bg-white hover:bg-blue-600 transition-all duration-300 ease-in-out w-12 hover:w-40 border border-white hover:border-blue-600 focus:outline-none cursor-pointer"
                          title="Add to Cart"
                        >
                          <ShoppingCart
                            size={24}
                            className="text-blue-500 group-hover:text-white flex-shrink-0 transition-colors duration-300"
                          />
                          <span className="text-white font-semibold text-sm ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Add to cart
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Package Customization Section */}
            {selectedPackageId && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  Customize Your Package
                </h3>

                {/* Guest Count Selector */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold text-gray-800 mb-4">
                    Guest Count: {guestCount}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>10</span>
                    <span>250</span>
                    <span>500</span>
                  </div>
                </div>

                {/* Add-ons Grid */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Add-ons & Features
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {addOns.map((addOn) => (
                      <button
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`p-4 rounded-lg border-2 transition duration-200 text-center ${
                          selectedAddOns.includes(addOn.id)
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 bg-white hover:border-blue-300"
                        }`}
                      >
                        <p className="font-semibold text-gray-800">
                          {addOn.name}
                        </p>
                        <p className="text-sm text-gray-600">+${addOn.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Package Details Link */}
                <div className="mb-8">
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    View Full Package Details →
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-8">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200">
                    Book This Package
                  </button>
                  <button className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg transition duration-200">
                    Save to Wishlist
                  </button>
                </div>

                {/* Tabbed Navigation */}
                <div className="border-b border-gray-300">
                  <div className="flex space-x-8">
                    {[
                      { key: "details", label: "Details" },
                      { key: "reviews", label: "Reviews" },
                      { key: "terms", label: "Terms & Policies" },
                      { key: "checklist", label: "Planning Checklist" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setSelectedTab(tab.key)}
                        className={`pb-4 font-medium transition duration-200 ${
                          selectedTab === tab.key
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600 hover:text-gray-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {selectedTab === "details" && (
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">
                        Package Details
                      </h5>
                      <ul className="space-y-2 text-gray-700">
                        <li>✓ Full venue setup and decoration</li>
                        <li>✓ Professional event coordination</li>
                        <li>✓ Audio and visual equipment</li>
                        <li>✓ Catering options available</li>
                        <li>✓ 24/7 customer support</li>
                      </ul>
                    </div>
                  )}
                  {selectedTab === "reviews" && (
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">
                        Customer Reviews
                      </h5>
                      <p className="text-gray-700">
                        ⭐⭐⭐⭐⭐ "Amazing experience! Highly recommended." -
                        Sarah M.
                      </p>
                      <p className="text-gray-700 mt-2">
                        ⭐⭐⭐⭐⭐ "Professional and organized team." - John D.
                      </p>
                    </div>
                  )}
                  {selectedTab === "terms" && (
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">
                        Terms & Policies
                      </h5>
                      <p className="text-gray-700 text-sm">
                        • Bookings must be confirmed 30 days in advance
                        <br />• Cancellation refunds available up to 14 days
                        before event
                        <br />• Weather contingency plan included
                        <br />• Insurance coverage provided for all packages
                      </p>
                    </div>
                  )}
                  {selectedTab === "checklist" && (
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-3">
                        Planning Checklist
                      </h5>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-700">
                            Confirm guest count
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-700">
                            Select add-on services
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-700">
                            Schedule venue walkthrough
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-gray-700">
                            Review final contract
                          </span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyCartPage;
