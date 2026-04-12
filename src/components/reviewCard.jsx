import React from "react";
import { Star } from "lucide-react";

const ReviewCard = ({ name, review, rating, image, date }) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-3 p-4 transition-colors duration-200 bg-white border border-slate-100 rounded-xl hover:border-blue-400">
      <div className="flex items-center gap-3">
        {image ? (
          <img
            src={image}
            alt={name}
            className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-blue-50">
            <span className="text-xs font-medium text-blue-700">
              {initials}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-medium leading-none text-slate-800">
            {name}
          </p>
          {date && (
            <p className="mt-1 text-xs text-slate-400">
              {new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      <p className="text-xs leading-relaxed text-slate-500 line-clamp-3">
        {review}
      </p>

      <div className="flex gap-1 mt-auto">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={11}
            className={
              i < rating
                ? "text-amber-400 fill-amber-400"
                : "text-slate-200 fill-slate-200"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
