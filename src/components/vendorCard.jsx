import React from "react";
import { Star } from "lucide-react";

const VendorCard = ({
  imageUrl,
  alt,
  businessName,
  description,
  rating,
  jobs_done,
}) => {
  return (
    <div className="p-4 text-xs bg-gray-200 rounded-lg shadow-sm gap-y-2 text-slate-700">
      <img
        src={imageUrl}
        alt={alt}
        className="w-20 h-20 mx-auto rounded-full"
      />

      <div className="flex flex-col items-center mt-3 text-center">
        <p className="text-sm font-semibold">{businessName}</p>
        <p>{description}</p>
      </div>

      <div className="flex items-center justify-center mt-2 text-sm gap-x-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i <= Math.round(rating)
                ? "text-yellow-300 fill-yellow-300"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1">{rating}</span>

        <span className="ml-2 text-gray-400">•</span>
        <span>{jobs_done} jobs</span>
      </div>
    </div>
  );
};

export default VendorCard;
