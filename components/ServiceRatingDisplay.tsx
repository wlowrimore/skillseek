"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { StarRating } from "./ui/StarRatingComponent";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { calculateAverageRating } from "@/lib/utils";
import { getServiceData } from "@/app/(root)/service/[id]/ServiceContentServer";
import RatingsCarousel from "./RatingsCarouselDisplay";

export interface RatingData {
  rating: number | null;
  ratingInfo: {
    serviceId: string;
    providerId: string;
  };
  ratingKey: string | undefined;
  review: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

export interface ServiceRatingProps {
  userId: string | undefined;
  serviceId: string;
  providerId: string;
  currentUserRating?: RatingData;
  ratingKey?: string | undefined;
  review?: string;
}

const ServicRatingDisplay: React.FC<ServiceRatingProps> = ({
  serviceId,
  providerId,
  currentUserRating,
}) => {
  const [review, setReview] = useState(currentUserRating?.review || "");
  const [hasReviews, setHasReviews] = useState(false);
  const [ratings, setRatings] = useState<RatingData[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const { ratings, averageRating } = await getServiceData(serviceId);
        setRatings(ratings);
        setHasReviews(ratings.length > 0);
        const calculatedAverageRating = calculateAverageRating(ratings);
        setAverageRating(await calculatedAverageRating);
        setReview(currentUserRating?.review || "");
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="space-y-8">
      {/* Average Rating Display */}
      {ratings.length > 0 ? (
        <div className="flex flex-col md:inline-flex items-center md:gap-4 mt-6">
          <StarRating
            rating={averageRating}
            disabled={true}
            showText={false}
            size={24}
          />
          <span className="text-sm text-muted-foreground">
            {averageRating?.toFixed(1)} out of 5 ({ratings.length} ratings)
          </span>
        </div>
      ) : (
        <div className="pt-6 text-sm md:pl-14 text-start text-muted-foreground">
          <p>No ratings available</p>
        </div>
      )}
      <div className="pt-3 md:pt-8">
        <h3 className="text-lg font-medium">Client Reviews</h3>
        <hr className="small_divider" />
      </div>
      <div className="space-y-4 flex flex-col mx-auto">
        {ratings.length === 0 ? (
          <p className="text-sm md:pl-14 text-muted-foreground text-start">
            This service has not yet been reviewed
          </p>
        ) : (
          <RatingsCarousel ratings={ratings} />
        )}
      </div>
    </div>
  );
};

export default ServicRatingDisplay;
