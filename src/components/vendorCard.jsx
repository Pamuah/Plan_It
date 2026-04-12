import React from "react";
import { Star } from "lucide-react";

const VendorCard = ({
  imageUrl,
  alt,
  businessName,
  description,
  rating,
  jobs_done,
  onClick,
  badge, // optional e.g. "Top rated"
}) => {
  const initials = businessName
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      onClick={onClick}
      className="bg-white border border-slate-100 rounded-xl px-4 pt-5 pb-4 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:border-blue-400 hover:-translate-y-0.5"
    >
      {/* Avatar with blue ring */}
      <div className="w-[72px] h-[72px] rounded-full border-2 border-blue-200 p-0.5 mb-3 flex-shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={alt}
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full rounded-full bg-blue-50">
            <span className="text-sm font-medium text-blue-700">
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* Optional badge */}
      {badge && (
        <span className="text-[10px] font-medium bg-blue-50 text-blue-700 rounded px-2 py-0.5 mb-2">
          {badge}
        </span>
      )}

      <p className="mb-1 text-sm font-medium text-slate-800">{businessName}</p>
      <p className="mb-3 text-xs leading-snug text-slate-500 line-clamp-2">
        {description}
      </p>

      <div className="w-full h-px mb-3 bg-slate-100" />

      {/* Rating row */}
      <div className="flex items-center justify-center gap-1">
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

export default VendorCard;
