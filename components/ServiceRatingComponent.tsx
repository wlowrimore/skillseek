"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { StarRating } from "./ui/StarRatingComponent";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ServiceRatingDisplay from "./ServiceRatingDisplay";
// import RatingAndReviewComponent from "./RatingAndReviewComponent";

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
  currentUserRating,
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const ratingKey = searchParams.get("ratingKey");

  const [rating, setRating] = useState(currentUserRating?.rating || 0);
  const [comment, setComment] = useState(currentUserRating?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratings, setRatings] = useState<RatingData[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isValidRatingKey, setIsValidRatingKey] = useState(false);

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
      {/* <div className="space-y-4">
        <h3 className="font-medium">Reviews</h3>
        {ratings.length === 0 ? (
          <p className="text-sm text-muted-foreground">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {ratings.map((rating, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Image
                    src={rating.user.image || "/default-avatar.png"}
                    alt={rating.user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{rating.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(rating.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
                <StarRating
                  rating={rating.rating || 0}
                  maxRating={5}
                  disabled={true}
                  showText={false}
                  size={16}
                />
                {rating.comment && (
                  <p className="text-sm mt-2">{rating.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ServicRating;
