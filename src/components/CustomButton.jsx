import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomButton = ({
  title,
  trailingIcon, // expects an icon definition like faUser
  onPress,
  className = "",
}) => {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded-lg inline-flex items-center justify-center font-bold hover:bg-blue-600 active:scale-95 transition duration-150 gap-x-2 ${className}`}
      onClick={onPress}
    >
      <span>{title}</span>
      {trailingIcon && <FontAwesomeIcon icon={trailingIcon} />}
    </button>
  );
};

export default CustomButton;
