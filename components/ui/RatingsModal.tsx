import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { RatingData } from "@/components/RatingsCarouselDisplay";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { StarRating } from "./StarRatingComponent";
import { useSearchParams } from "next/navigation";

const RatingsModal = ({
  selectedRating,
  handleReadMore,
  dialogOpen,
  onClose,
}: {
  selectedRating: RatingData | null;
  handleReadMore: (rating: RatingData) => void;
  dialogOpen: boolean;
  onClose: () => void;
}) => {
  const searchParams = useSearchParams();
  const ratingId = searchParams.get("id");
  //   const rating = ratingId ? JSON.parse(ratingId) : null;

  return (
    console.log("Selected rating:", selectedRating),
    (
      <Dialog open={dialogOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>

          {selectedRating && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <img
                  src={selectedRating.user.image || "/default-avatar.png"}
                  alt={selectedRating.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{selectedRating.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(selectedRating.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>

              <div>
                <StarRating
                  rating={selectedRating.rating || 0}
                  maxRating={5}
                  disabled={true}
                  showText={false}
                  size={16}
                />
              </div>

              <p className="text-sm">
                {selectedRating.review || "No review provided"}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    )
  );
};

export default RatingsModal;
