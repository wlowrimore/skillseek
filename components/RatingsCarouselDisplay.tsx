"use client";

import { useEffect, useRef, useState } from "react";
import { StarRating } from "./ui/StarRatingComponent";
import { formatDistanceToNow } from "date-fns";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import RatingsModal from "./ui/RatingsModal";

interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export interface RatingData {
  _id: string;
  user: User;
  rating: number;
  averageRating: number | null;
  review: string;
  createdAt: string;
  license: string | null;
  licensingState: string | null;
}

export interface ServiceRatingProps {
  userId: string | undefined;
  serviceId: string;
  providerId: string;
  currentUserRating?: RatingData;
  ratingKey?: string | undefined;
  review?: string;
}

const RatingsCarousel = ({ ratings }: { ratings: RatingData[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRating, setSelectedRating] = useState<RatingData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const mounted = useRef(false);

  const truncateText = (text: string, maxLength = 60) => {
    if (!text) return "No review provided";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleReadMore = (rating: RatingData) => {
    if (mounted.current) {
      setSelectedRating(rating);
      setDialogOpen(true);
    }
  };

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const nextSlide = () => {
    if (mounted.current) {
      setCurrentIndex((prev) => (prev + 1) % ratings.length);
    }
  };

  const prevSlide = () => {
    if (mounted.current) {
      setCurrentIndex((prev) => (prev - 1 + ratings.length) % ratings.length);
    }
  };

  useEffect(() => {
    console.log(
      "Current rating:",
      ratings[currentIndex]?.review?.length,
      ratings[currentIndex]
    );
    console.log(`Review Length: ${ratings[currentIndex]?.review?.length}`);
  }, [currentIndex, ratings]);

  if (!ratings || ratings.length === 0) {
    return null;
  }

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
        <div className="md:hidden w-full max-w-4xl flex justify-end absolute top-[0.6rem] right-0 left-5 z-0">
          <div className="md:hidden flex items-center justify-center border border-white text-slate-800 rounded-xl absolute top-[50%] right-0 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              className="border-[#275975]"
              onClick={prevSlide}
            >
              <ChevronsLeft className="p-0.5" />
            </Button>
            <p className="text-sm text-slate-800 font-medium">View All</p>
            <Button
              variant="ghost"
              className="border-[#275975]"
              onClick={nextSlide}
            >
              <ChevronsRight className="p-0.5" />
            </Button>
          </div>
        </div>

        {/* Current Rating Card */}
        <div className="overflow-hidden md:px-36">
          <div className="transition-transform duration-300 ease-in-out">
            <Card className="mb-5 md:mb-0 md:p-6">
              <div className="w-full flex items-center gap-2">
                <img
                  src={
                    ratings[currentIndex]?.user?.image || "/default-avatar.png"
                  }
                  alt={ratings[currentIndex]?.user?.name || "User"}
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

              <div className="mt-2 h-[2rem]">
                <p className="text-sm">
                  {truncateText(ratings[currentIndex].review)}
                  {ratings[currentIndex].review?.length > 50 && (
                    <Button
                      variant="link"
                      className="pr-1 pl-0 py-0 h-fit text-cyan-600 md:text-slate-400 hover:underline"
                      onClick={() => handleReadMore(ratings[currentIndex])}
                    >
                      read more
                    </Button>
                  )}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
      {selectedRating !== null && (
        <RatingsModal
          selectedRating={selectedRating}
          dialogOpen={dialogOpen}
          handleReadMore={handleReadMore}
          onClose={() => {
            setDialogOpen(false);
            setSelectedRating(null);
          }}
        />
      )}
    </div>
  );
};

export default RatingsCarousel;
