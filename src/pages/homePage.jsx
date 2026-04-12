import React from "react";
import { useNavigate } from "react-router-dom";
import VendorCard from "../components/vendorCard";
import vendorData from "../utils/vendorData";
import fyData from "../utils/fyData";
import FYCard from "../components/fyCard";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import ReviewCard from "../components/reviewCard";
import ReviewsData from "../utils/reviewData";
import SearchBar from "../components/search";
import { ShoppingCart, Calendar, Bell } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-700">
      {/* Nav Bar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-8 bg-white border-b border-slate-100">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
            <span className="text-xs font-bold text-white">PI</span>
          </div>
          <span className="text-sm font-semibold text-slate-800">Plan It</span>
        </div>

        {/* SearchBar */}
        <div className="flex-1 max-w-md mx-8">
          <SearchBar
            placeholder="Search vendors, services..."
            onChange={() => {}}
          />
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          {/* Event Manager */}
          <a
            href="/manage"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 rounded-lg transition-all duration-150 hover:bg-blue-50 hover:text-blue-600"
          >
            <Calendar className="w-3.5 h-3.5" />
            Event Manager
          </a>

          {/* Cart */}
          <a
            href="/myCart"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 rounded-lg transition-all duration-150 hover:bg-blue-50 hover:text-blue-600"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Cart
          </a>

          {/* Sign Up */}
          <a
            href="/signUp"
            className="px-4 py-2 ml-2 text-xs font-medium text-white transition-all duration-150 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </a>

          {/* Avatar */}
          <div className="flex items-center justify-center w-8 h-8 ml-2 bg-blue-100 border-2 border-blue-200 rounded-full cursor-pointer">
            <span className="text-xs font-medium text-blue-700">U</span>
          </div>
        </div>
      </nav>

      {/* Hero / Carousel */}
      <div className="w-full px-8 pt-6 pb-2">
        <div className="overflow-hidden rounded-2xl">
          <Carousel />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col gap-10 px-8 py-8">
        {/* Top Vendors */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                Top Vendors
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Highest rated professionals near you
              </p>
            </div>
            <button
              onClick={() => navigate("/vendors")}
              className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {vendorData.map((vendor) => (
              <VendorCard
                key={vendor.id}
                imageUrl={vendor.imageUrl}
                alt={vendor.alt}
                businessName={vendor.businessName}
                description={vendor.description}
                rating={vendor.rating}
                jobs_done={vendor.jobs_done}
                onClick={() => navigate("/vendors")}
              />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* For You */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">For You</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Picks based on your interests
              </p>
            </div>
            <button
              onClick={() => navigate("/vendors")}
              className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {fyData.map((item) => (
              <FYCard
                key={item.id}
                imageUrl={item.imageUrl}
                alt={item.alt}
                businessName={item.businessName}
                description={item.description}
                rating={item.rating}
                jobs_done={item.jobs_done}
                onClick={() => navigate("/vendors")}
              />
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Reviews */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">
                What clients say
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Real reviews from verified bookings
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {ReviewsData.map((item, index) => (
              <ReviewCard
                key={index}
                name={item.name}
                review={item.review}
                rating={item.rating}
                image={item.image}
                date={item.date}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default HomePage;
