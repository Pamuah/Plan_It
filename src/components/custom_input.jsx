import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomInput = ({
  width = "w-80",
  height = "h-10",
  placeholder,
  onChange,
  label,
  Value,
  icon, // pass an icon definition from Font Awesome
}) => {
  return (
    <div>
      <h6 className="text-sm font-semibold text-gray-800 font-inter mt-4 mb-1">
        {label}
      </h6>
      <div
        className={`flex items-center border border-gray-300 rounded-lg bg-transparent ${width} ${height}`}
      >
        {icon && (
          <span className="pl-3 pr-2 text-gray-500">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        <input
          type="text"
          className={`p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-slate-700 bg-transparent text-gray-500 font-inter rounded-lg`}
          placeholder={placeholder}
          value={Value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default CustomInput;
