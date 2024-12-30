"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
  showText?: boolean;
  disabled?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = 20,
  className,
  showText = false,
  disabled = false,
  onRatingChange,
}: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const handleClick = (index: number) => {
    if (!disabled && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="fill-yellow-400 text-yellow-400 cursor-pointer"
          onClick={() => handleClick(i)}
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star size={size} className="text-yellow-400" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <Star size={size} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className="text-gray-300"
          onClick={() => handleClick(fullStars + (hasHalfStar ? 1 : 0) + i)}
        />
      ))}

      {showText && (
        <span className="text-sm text-muted-foreground ml-2">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
