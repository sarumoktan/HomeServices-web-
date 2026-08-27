import React from "react";
import { Star } from "lucide-react";

export function StarRow({ rating = 5, reviewsCount }) {
  return (
    <div className="flex items-center gap-1 text-[#E8AE3F]">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? "fill-current" : "text-black/20"}`}
          />
        ))}
      </div>
      {reviewsCount !== undefined && (
        <span className="text-xs text-[#17181A]/60 ml-1">({reviewsCount})</span>
      )}
    </div>
  );
}