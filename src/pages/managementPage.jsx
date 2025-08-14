import { useState } from "react";
import BudgetTracker from "../components/budgetTracker";
import GuestList from "../components/guestList";
import Timeline from "../components/timeLine";

export default function Management() {
  const [activeTab, setActiveTab] = useState("guestList");

  const renderContent = () => {
    switch (activeTab) {
      case "guestList":
        return <GuestList />;
      case "budget":
        return <BudgetTracker />;
      case "timeline":
        return <Timeline />;
      default:
        return <GuestList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black/80">
      {/* Navbar */}
      <nav className="shadow-md bg-black/80">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex items-center justify-between h-14">
            <h1
              className={`text-xl font-bold  ${
                activeTab === "guestList"
                  ? "text-orange-500"
                  : activeTab === "budget"
                  ? "text-purple-500"
                  : activeTab === "timeline"
                  ? "text-green-500"
                  : "text-gray-500"
              }`}
            >
              Event Manager
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab("guestList")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === "guestList"
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Guest List
              </button>
              <button
                onClick={() => setActiveTab("budget")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === "budget"
                    ? "bg-purple-500 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Budget Tracker
              </button>
              <button
                onClick={() => setActiveTab("timeline")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  activeTab === "timeline"
                    ? "bg-green-500 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="p-6 rounded-lg shadow-md bg-black/50">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
