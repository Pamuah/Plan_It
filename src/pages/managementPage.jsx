import { useState } from "react";
import BudgetTracker from "../components/BudgetTracker";
import GuestList from "../components/GuestList";
import Timeline from "../components/Timeline";

const tabs = [
  {
    key: "guestList",
    label: "Guest List",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    key: "budget",
    label: "Budget",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: "timeline",
    label: "Timeline",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

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
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <nav className="sticky top-0 z-30 bg-white border-b shadow-sm border-slate-200">
        <div className="flex items-center justify-between h-16 max-w-5xl px-6 mx-auto">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center bg-blue-600 rounded-md w-7 h-7">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-800">
              Event Manager
            </span>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Page title strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-5xl px-6 py-5 mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">
            {tabs.find((t) => t.key === activeTab)?.label}
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {activeTab === "guestList" &&
              "Manage attendees and track RSVPs for your event."}
            {activeTab === "budget" &&
              "Track expenses and stay on top of your event budget."}
            {activeTab === "timeline" &&
              "Plan tasks and milestones leading up to your event."}
          </p>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl px-6 py-8 mx-auto">{renderContent()}</main>
    </div>
  );
}
