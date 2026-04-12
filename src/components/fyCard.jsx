import React from "react";
import { Star } from "lucide-react";

const FYCard = ({
  imageUrl,
  alt,
  businessName,
  description,
  rating,
  jobs_done,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-100 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:border-blue-400 hover:-translate-y-0.5 hover:shadow-sm"
    >
      <img
        src={imageUrl}
        alt={alt}
        className="block object-cover w-full h-28"
      />

      <div className="px-3 pt-3 pb-1">
        <p className="text-sm font-medium truncate text-slate-800">
          {businessName}
        </p>
        <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-1 px-3 pb-3 mt-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-2.5 h-2.5 ${
              i <= Math.round(rating)
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200 fill-slate-200"
            }`}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-slate-700">
          {rating}
        </span>
        <span className="mx-1 text-xs text-slate-300">·</span>
        <span className="text-xs text-slate-400">{jobs_done} jobs</span>
      </div>
    </div>
  );
};

export default FYCard;
