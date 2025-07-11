import React from "react";

function SearchBar({ placeholder: placeholder, onChange: onChange }) {
  return (
    <div className="relative z-20 bg-gray-100 px-2 py-1.5 rounded-full flex items-center h-10 justify-center w-full shadow-md">
      {/* Location Input */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="flex-1 px-2 text-sm font-medium text-gray-600 bg-transparent outline-none"
      />

      {/* Search Icon */}
      <button className="ml-4 bg-slate-400 p-1.5 rounded-full shadow">
        🔍
      </button>
    </div>
  );
}

export default SearchBar;
