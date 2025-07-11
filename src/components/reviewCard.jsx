import React from "react";
import { Star } from "lucide-react"; // You can also use your own star icons

const ReviewCard = ({ name, review, rating, image, date }) => {
  return (
    <div className="w-full max-w-md p-4 shadow-md h-36 bg-slate-400 rounded-2xl">
      <div className="flex items-center gap-4 mb-3">
        <img
          src={image}
          alt={name}
          className="object-cover w-12 h-12 border border-gray-300 rounded-full"
        />
        <div>
          <p className="text-xs font-normal text-gray-800">{name}</p>
          {date && (
            <p className="text-xs text-gray-200">
              {new Date(date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      <p className="mb-3 text-xs text-gray-700">{review}</p>

      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={12}
            className={
              index < rating
                ? "text-yellow-500 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
