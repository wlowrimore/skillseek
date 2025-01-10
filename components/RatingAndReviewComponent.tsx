"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Image from "next/image";

export interface RatingAndReviewProps {
  ratingKey: string | undefined;
  serviceId: string;
  providerId: string;
  serviceData: {
    title: string;
    image: string;
    category: string;
    description: string;
  } | null;
  providerData: {
    name: string;
    image: string;
    contact: {
      email: string;
    };
  };
  ratingInfo: {
    service: {
      description: string;
      name: string;
      title: string;
      category: string;
      image: string;
      _id: string;
      provider: {
        name: string;
        image: string;
        _id: string;
      };
    };
    serviceId: string;
    serviceTitle: string;
  };
}

const RatingAndReviewComponent = ({
  ratingKey,
  serviceId,
  providerId,
  serviceData,
  ratingInfo: ratingInfo,
  providerData,
}: RatingAndReviewProps) => {
  console.log("Component Props:", {
    ratingKey,
    serviceId,
    providerId,
    serviceData,
    ratingInfo,
    providerData,
  });
  const router = useRouter();
  const { toast } = useToast();

  const [isValidRatingKey, setIsValidRatingKey] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    const verifyRatingKey = async () => {
      if (!ratingKey) {
        console.log("No rating key found in URL");
        return;
      }

      try {
        const response = await fetch("/api/verify-rating-key", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: ratingKey,
            serviceId,
            providerId,
          }),
        });

        const data = await response.json();

        if (response.ok && data.valid) {
          setIsValidRatingKey(true);
        } else {
          toast({
            title: "Invalid Rating Key",
            description:
              data.message || "You cannot rate this service at this time.",
            variant: "destructive",
          });
          router.push("/");
        }
      } catch (error) {
        console.error("Error verifying rating key:", error);
        toast({
          title: "Error",
          description: "Failed to verify rating key. Please try again later.",
          variant: "destructive",
        });
      }
    };

    verifyRatingKey();
  }, [ratingKey, serviceId, providerId, toast, router]);

  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    console.log(
      "Submitting rating:",
      rating,
      review,
      ratingInfo,
      serviceId,
      providerId
    );
    try {
      const response = await fetch("/api/submit-rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId,
          providerId,
          ratingInfo,
          rating,
          review,
          ratingKey,
        }),
      });

      const data = await response.json();
      console.log("Rating submission response:", data);

      if (response.ok) {
        toast({
          title: "Thank you!",
          description: "Your rating has been submitted successfully.",
          variant: "success",
        });
        router.refresh();
        router.push(`/service/${serviceId}`);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit rating.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isValidRatingKey) {
    return null;
  }

  return (
    <section className="container px-4 w-full md:mx-auto my-14 md:my-[4.2rem] flex flex-col items-center">
      <h1 className="w-full font-bold text-3xl mt-8 md:mt-12 lg:pt-6 pb-4 border-b">
        Rate This Service
      </h1>

      <div className="flex justify-center space-x-2 my-10">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-2 hover:scale-110 transition-transform"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => setRating(star)}
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoveredRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-400"
              }`}
            />
          </button>
        ))}
      </div>

      <section className="flex flex-col items-center gap-4 mx-auto">
        {providerData && (
          <div className="flex flex-col md:flex-row w-full flex-1 items-center gap-3">
            <div className="relative p-0.5 rounded-xl md:rounded-full border-2 border-black">
              <Image
                src={providerData?.image}
                alt={providerData?.name as string}
                width={400}
                height={400}
                className="w-24 h-24 md:w-14 md:h-14 rounded-xl md:rounded-full"
              />
            </div>
            <div className="flex flex-col items-start py-4">
              <h1 className="text-xl font-[500]">{providerData?.name}</h1>
              <p className="text-sm font-[400]">{serviceData?.description}</p>
            </div>
          </div>
        )}
        {serviceData && (
          <div className="w-full flex flex-col mt-2 mb-8">
            <h1 className="text-4xl font-[600] mb-2 text-start">
              {serviceData?.title}
            </h1>
            <div className="relative flex flex-col md:grid md:grid-cols-2 w-full max-h-[20rem] md:h-[30rem] md:max-h-[30rem] bg-zinc-400 md:bg-white aspect-video border border-zinc-300 md:border-none rounded-xl md:rounded-tl-xl md:rounded-bl-xl md:rounded-br-none md:rounded-tr-none shadow-lg shadow-black md:shadow-none">
              <div className="md:flex gap-2 w-full h-[20rem] max-h-[20rem] md:max-h-[30rem] md:h-[30rem] md:pr-4 md:border-r-2 border-black">
                <Image
                  src={serviceData?.image as string}
                  alt={serviceData?.title as string}
                  width={700}
                  height={700}
                  className="w-full object-cover h-full rounded-xl md:rounded-tl-lg md:rounded-bl-lg md:rounded-tr-none md:rounded-br-none border border-white"
                />
              </div>
              <div className="hidden md:flex flex-col md:ml-[1.15rem]">
                <Textarea
                  placeholder="Share your experience with this service (optional)"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full bg-slate-100 md:h-full border md:border-none rounded-lg md:rounded-tr-lg md:rounded-br-none md:rounded-bl-none md:rounded-tl-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <Button
                  className={`w-full py-2 px-4 mx-auto rounded-lg md:rounded-tr-none md:rounded-br-lg md:rounded-bl-none md:rounded-tl-none text-white transition-colors duration-200 mt-3 ${
                    isSubmitting || rating === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-cyan-700 hover:bg-cyan-600"
                  }`}
                  onClick={handleSubmitRating}
                  disabled={isSubmitting || rating === 0}
                >
                  {isSubmitting ? "Submitting..." : "Submit Rating"}
                </Button>
              </div>
            </div>
          </div>
        )}
        <div className="md:hidden flex flex-col gap-2 w-full">
          <Textarea
            placeholder="Share your experience with this service (optional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full min-h-[100px] p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            className={`w-full py-2 px-4 rounded-lg text-white transition-colors duration-200 mt-3 ${
              isSubmitting || rating === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-700 hover:bg-cyan-600"
            }`}
            onClick={handleSubmitRating}
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </Button>
        </div>
      </section>
    </section>
  );
};

export default RatingAndReviewComponent;
