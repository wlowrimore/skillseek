"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { StarRating } from "./ui/StarRatingComponent";
import ServiceRatingDisplay from "./ServiceRatingDisplay";

export interface RatingData {
  rating: number | null;
  ratingInfo: {
    serviceId: string;
    providerId: string;
  };
  ratingKey: string | undefined;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image?: string;
  };
}

export interface ServiceRatingProps {
  userId: string | undefined;
  serviceId: string;
  providerId: string;
  currentUserRating?: RatingData;
  ratingKey?: string | undefined;
}

const ServicRating: React.FC<ServiceRatingProps> = ({
  serviceId,
  providerId,
}) => {
  const { data: session } = useSession();
  const [ratings, setRatings] = useState<RatingData[]>([]);
  const [averageRating, setAverageRating] = useState(0);

  return (
    <div className="space-y-8">
      {/* Average Rating Display */}
      <div className="flex items-center gap-4">
        <StarRating
          rating={averageRating}
          disabled={true}
          showText={false}
          size={24}
        />
        <span className="text-sm text-muted-foreground">
          {averageRating.toFixed(1)} out of 5 ({ratings.length} ratings)
        </span>
      </div>

      {/* Ratings List */}
      <ServiceRatingDisplay
        serviceId={serviceId}
        providerId={providerId}
        userId={session?.user?.id}
      />
    </div>
  );
};

export default ServicRating;
