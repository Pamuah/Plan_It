import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import Footer from "../components/footer";

// Mock data for events (replace with API call when backend is ready)
const mockEvents = [
  { id: 1, name: "Birthday Party", date: "2025-06-10", location: "New York" },
  {
    id: 2,
    name: "Wedding Ceremony",
    date: "2025-06-15",
    location: "Los Angeles",
  },
  { id: 3, name: "Music Concert", date: "2025-06-20", location: "Chicago" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const username = "JohnDoe"; // Mock username, replace with actual user data

  return (
    <div className="flex flex-col min-h-screen w-screen bg-background">
      {/* Nav Bar (Matching LandingPage.jsx) */}
      <div className="h-16 w-full items-center justify-between bg-blue shadow-lg px-6 py-2 flex flex-row">
        <div>
          <h6>*Logo*</h6>
        </div>
        <div className="gap-5 flex flex-row items-center">
          <CustomButton
            title="Home"
            onPress={() => navigate("/")}
            className="text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition-all duration-200"
          />
          <CustomButton
            title="Profile"
            onPress={() => navigate("/profile")} // Placeholder route
            className="text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition-all duration-200"
          />
          <CustomButton
            title="Logout"
            onPress={() => navigate("/signIn")} // Redirect to Sign In on logout
            className="h-8 w-auto text-sm"
          />
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white h-full flex flex-col py-4">
          <div className="px-4 mb-6">
            <h6 className="text-lg font-bold">Welcome, {username}</h6>
          </div>
          <div className="flex flex-col gap-2">
            <button className="text-left px-4 py-2 hover:bg-gray-700">
              Dashboard
            </button>
            <button
              className="text-left px-4 py-2 hover:bg-gray-700"
              onClick={() => navigate("/events")}
            >
              Events
            </button>
            <button
              className="text-left px-4 py-2 hover:bg-gray-700"
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
            <button className="text-left px-4 py-2 hover:bg-gray-700">
              Settings
            </button>
          </div>
        </div>

        {/* Main Area */}
        <div className="flex-1 p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-black">Dashboard</h1>
            <CustomButton
              title="Create Event"
              onPress={() => navigate("/create-event")} // Placeholder route
              className="h-10 w-auto text-sm bg-blue-500 text-white hover:bg-blue-600"
            />
          </div>

          {/* Upcoming Events Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-black mb-4">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white shadow-md rounded-md p-4"
                >
                  <h3 className="text-lg font-semibold text-black">
                    {event.name}
                  </h3>
                  <p className="text-gray-600">Date: {event.date}</p>
                  <p className="text-gray-600">Location: {event.location}</p>
                  <CustomButton
                    title="View Details"
                    onPress={() => navigate(`/event/${event.id}`)} // Placeholder route
                    className="h-8 w-auto text-sm mt-2 bg-blue-500 text-white hover:bg-blue-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions (Optional) */}
          <div className="flex gap-4">
            <CustomButton
              title="View All Events"
              onPress={() => navigate("/events")} // Placeholder route
              className="h-10 w-auto text-sm bg-gray-500 text-white hover:bg-gray-600"
            />
            <CustomButton
              title="Manage Profile"
              onPress={() => navigate("/profile")} // Placeholder route
              className="h-10 w-auto text-sm bg-gray-500 text-white hover:bg-gray-600"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
