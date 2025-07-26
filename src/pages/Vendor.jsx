import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import Footer from "../components/footer";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

// Mock data
const showcaseVendors = [
  {
    id: 1,
    name: "Vendor A",
    description: "Event Decor Specialist",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 2,
    name: "Vendor B",
    description: "Catering Expert",
    image: "https://via.placeholder.com/400x200",
  },
  {
    id: 3,
    name: "Vendor C",
    description: "Entertainment Pro",
    image: "https://via.placeholder.com/400x200",
  },
];

const categories = {
  Decor: [
    {
      id: 1,
      name: "Decor Vendor 1",
      category: "Decor",
      image: "https://via.placeholder.com/300x150",
    },
    {
      id: 2,
      name: "Decor Vendor 2",
      category: "Decor",
      image: "https://via.placeholder.com/300x150",
    },
  ],
  Catering: [
    {
      id: 3,
      name: "Catering Vendor 1",
      category: "Catering",
      image: "https://via.placeholder.com/300x150",
    },
    {
      id: 4,
      name: "Catering Vendor 2",
      category: "Catering",
      image: "https://via.placeholder.com/300x150",
    },
  ],
  Entertainment: [
    {
      id: 5,
      name: "Entertainment Vendor 1",
      category: "Entertainment",
      image: "https://via.placeholder.com/300x150",
    },
    {
      id: 6,
      name: "Entertainment Vendor 2",
      category: "Entertainment",
      image: "https://via.placeholder.com/300x150",
    },
  ],
};

const reviews = [
  { id: 1, name: "John Doe", rating: "★★★★☆", text: "Great service!" },
  { id: 2, name: "Jane Smith", rating: "★★★★★", text: "Highly recommend!" },
];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Vendor = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen w-screen bg-background">
      {/* Nav Bar */}
      <div className="h-16 w-full items-center justify-between bg-blue shadow-lg px-6 py-2 flex flex-row">
        <div>
          <h6 className="text-white font-bold">Plan-It Logo</h6>
        </div>
        <div className="gap-5 flex flex-row items-center">
          <CustomButton
            title="Home"
            onPress={() => navigate("/")}
            className="text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition-all duration-200"
          />
          <CustomButton
            title="Dashboard"
            onPress={() => navigate("/dashboard")}
            className="text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition-all duration-200"
          />
          <CustomButton
            title="Logout"
            onPress={() => navigate("/signIn")}
            className="h-8 w-auto text-sm"
          />
        </div>
      </div>

      {/* Mini Showcase (Vendor) */}
      <div className="p-6">
        <AutoPlaySwipeableViews interval={5000} enableMouseEvents>
          {showcaseVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white shadow-md rounded-md p-4 flex flex-col items-center"
            >
              <img
                src={vendor.image}
                alt={vendor.name}
                className="w-full h-64 object-cover rounded-md mb-2"
              />
              <h3 className="text-xl font-semibold text-black">
                {vendor.name}
              </h3>
              <p className="text-gray-600">{vendor.description}</p>
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <div className="flex justify-center mt-2">
          {showcaseVendors.map((_, index) => (
            <span
              key={index}
              className="mx-1 w-2 h-2 bg-gray-300 rounded-full"
            ></span>
          ))}
        </div>
      </div>

      {/* Categorized Vendors */}
      <div className="p-6">
        {Object.entries(categories).map(([category, vendors]) => (
          <div key={category} className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-4">
              {category} Vendors
            </h2>
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-white shadow-md rounded-md p-4 min-w-[300px] h-48 flex flex-col justify-between"
                >
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <h3 className="text-lg font-semibold text-black">
                    {vendor.name}
                  </h3>
                  <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded">
                    {vendor.category}
                  </span>
                </div>
              ))}
              <CustomButton
                title="See More"
                onPress={() => navigate(`/vendors/${category.toLowerCase()}`)}
                className="h-10 w-auto bg-blue-500 text-white hover:bg-blue-600 mt-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-black mb-4">Reviews</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white shadow-md rounded-md p-4 min-w-[300px] h-40"
            >
              <h3 className="text-lg font-semibold text-black">
                {review.name}
              </h3>
              <p className="text-yellow-500">{review.rating}</p>
              <p className="text-gray-600">{review.text}</p>
            </div>
          ))}
          <CustomButton
            title="See All Reviews"
            onPress={() => navigate("/reviews")}
            className="h-10 w-auto bg-blue-500 text-white hover:bg-blue-600 mt-2"
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Vendor;
