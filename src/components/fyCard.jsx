import React from "react";
import { Star } from "lucide-react";

const FYCard = ({
  imageUrl,
  alt,
  businessName,
  description,
  rating,
  jobs_done,
}) => {
  return (
    <div className="text-xs bg-white rounded-lg shadow-sm gap-y-2 text-slate-700">
      <img src={imageUrl} alt={alt} className="w-full h-30" />

      <div className="flex flex-col items-start px-2 mt-2 text-center">
        <p className="text-sm font-semibold">{businessName}</p>
        <p className="flex-wrap">{description}</p>
      </div>

      <div className="flex items-center justify-start px-2 mt-2 mb-2 text-sm gap-x-1">
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

export default FYCard;
