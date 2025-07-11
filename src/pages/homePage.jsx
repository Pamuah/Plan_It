import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import VendorCard from "../components/vendorCard";
import vendorData from "../utils/vendorData";
import fyData from "../utils/fyData";
import FYCard from "../components/fyCard";
import Footer from "../components/footer";
import Carousel from "../components/carousel";
import ReviewCard from "../components/reviewCard";
import ReviewsData from "../utils/reviewData";
import SearchBar from "../components/search";
import { ShoppingCart, Calendar } from "lucide-react";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen text-slate-700 bg-background">
      {/* Nav Bar */}
      <div className="flex flex-row items-center justify-between w-full h-16 px-6 py-2 bg-white shadow-lg">
        {/* Logo */}
        <div>
          <h6 className="text-sm font-bold text-slate-500">**Logo**</h6>
        </div>
        {/* SearchBar */}
        <div className="flex flex-row items-center gap-4">
          <SearchBar placeholder="Search..." onChange={() => {}} />
        </div>
        {/* Routes */}
        <div className="flex flex-row items-center gap-4">
          <a
            href="/signUp"
            className="flex flex-row items-center gap-2 px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            <Calendar className="w-4 h-4" />
            Events
          </a>
          <a
            href="/signUp"
            className="flex flex-row items-center gap-2 px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </a>

          <a
            href="/signUp"
            className="px-3 py-1 text-xs text-black transition-all duration-200 rounded-lg hover:bg-blue-500"
          >
            Payment
          </a>
          <div className="w-10 h-10 border-2 rounded-full border-slate-500 bg-lime-200"></div>
        </div>
      </div>
      {/* Hero Section */}
      <div className="flex flex-col items-start justify-center pt-8 px-18 h-[60vh]">
        <Carousel />
      </div>

      {/* Vendor Section */}
      <div className="flex flex-col items-start justify-center px-6 py-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-700">
          Top Vendors
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-4 ">
          {vendorData.map((vendor) => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              imageUrl={vendor.imageUrl}
              alt={vendor.alt}
              businessName={vendor.businessName}
              description={vendor.description}
              rating={vendor.rating}
              jobs_done={vendor.jobs_done}
            />
          ))}
        </div>
        <h2 className="my-4 text-xl font-semibold text-slate-700">For You</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {fyData.map((item) => (
            <FYCard
              key={item.id}
              item={item}
              imageUrl={item.imageUrl}
              alt={item.alt}
              businessName={item.businessName}
              description={item.description}
              rating={item.rating}
              jobs_done={item.jobs_done}
            />
          ))}
        </div>
      </div>

      {/* Review Section */}
      <h2 className="px-6 text-xl font-semibold text-slate-700">Reviews</h2>
      <div className="grid items-start justify-center grid-cols-1 gap-3 px-6 py-4 md:grid-cols-4 lg:grid-cols-5">
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
      <Footer />
    </div>
  );
};

export default HomePage;
