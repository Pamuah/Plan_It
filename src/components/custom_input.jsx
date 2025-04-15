import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomInput = ({
  width = "w-55",
  height = "h-8",
  placeholder = "",
  onChange = () => {},
  label = "",
  value = "",
  icon = null,
  type = "text",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      {label && (
        <h6 className="text-sm font-semibold text-gray-800 font-inter mt-4 mb-1">
          {label}
        </h6>
      )}
      <div
        className={`flex items-center  border rounded-sm bg-transparent ${width} ${height} ${
          isFocused ? "border-blue-500 shadow-md" : "border-gray-300"
        }`}
      >
        {icon && (
          <span className="pl-3 pr-2 text-gray-500">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        <input
          type={type}
          className="p-2 flex-1 outline-none bg-transparent text-gray-500 text-xs font-inter rounded-lg placeholder:text-xs placeholder:text-slate-500"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default CustomInput;
