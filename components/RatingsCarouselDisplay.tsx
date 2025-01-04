"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { StarRating } from "./ui/StarRatingComponent";
import { formatDistanceToNow } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

const RatingsCarousel: React.FC<{ ratings: RatingData[] }> = ({ ratings }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<RatingData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ratings.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + ratings.length) % ratings.length);
  };

  const truncateText = (text: string, maxLength = 100) => {
    if (!text) return "No review provided";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleReadMore = (rating: RatingData) => {
    setSelectedRating(rating);
    setDialogOpen(true);
  };

  return (
    <div className="relative w-[22.9rem] md:w-[56rem] mx-auto">
      {/* Carousel Navigation */}
      <div className="md:bg-gray-800 md:text-white rounded-lg">
        <div className="hidden md:block absolute left-[20%] md:top-1/2 md:left-[6%] -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/90 text-black"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-8 w-4" />
          </Button>
        </div>

        <div className="hidden md:block absolute right-[20%] md:top-1/2 md:right-[6%] -translate-y-1/2 z-10">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/90 text-black"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Small Screen Caraousel */}
        <div className="md:hidden w-full max-w-4xl flex justify-end absolute top-[3.8rem] right-0 left-0 z-0">
          <div className="md:hidden flex items-center border border-white rounded-full absolute top-[50%] right-0 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              className="py-[1rem] px-[0.7rem] border-[#275975] rounded-full bg-white/90 text-slate-600"
              onClick={prevSlide}
            >
              <ChevronsLeft className="p-1" />
            </Button>
            <p className="text-xs text-slate-800 font-medium mt-0.5">
              View All
            </p>
            <Button
              variant="ghost"
              className="py-[1rem] px-[0.7rem] border-[#275975] rounded-full bg-white/90 text-slate-600"
              onClick={nextSlide}
            >
              <ChevronsRight className="p-1" />
            </Button>
          </div>

          {/* <div className="md:hidden border border-white rounded-full absolute top-[50%] right-[25%] md:top-1/2 md:right-[6%] -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              className="py-[1rem] px-0.5 border-[#275975] rounded-full bg-white/90 text-black"
              onClick={nextSlide}
            >
              <ChevronRight className="p-1 rounded-full" />
            </Button>
          </div> */}
        </div>

        {/* Current Rating Card */}
        <div className="overflow-hidden md:px-36">
          <div className="transition-transform duration-300 ease-in-out">
            <Card className="mb-12 md:mb-0 md:p-6">
              <div className="w-full flex items-center gap-2">
                <img
                  src={
                    ratings[currentIndex].user.image || "/default-avatar.png"
                  }
                  alt={ratings[currentIndex].user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">
                    {ratings[currentIndex].user.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(
                      new Date(ratings[currentIndex].createdAt),
                      {
                        addSuffix: true,
                      }
                    )}
                  </p>
                </div>
              </div>

              <div className="my-3">
                <StarRating
                  rating={ratings[currentIndex].rating || 0}
                  maxRating={5}
                  disabled={true}
                  showText={false}
                  size={16}
                />
              </div>

              <div className="mt-2">
                <p className="text-sm">
                  {truncateText(ratings[currentIndex].review)}
                  {ratings[currentIndex].review?.length > 100 && (
                    <Button
                      variant="link"
                      className="px-1 py-0 h-fit"
                      onClick={() => handleReadMore(ratings[currentIndex])}
                    >
                      Read More
                    </Button>
                  )}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Full Review Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
    </div>
  );
};

export default RatingsCarousel;
