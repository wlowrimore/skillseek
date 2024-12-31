"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import RatingAndReviewComponent from "../../../../components/RatingAndReviewComponent";

interface ApiResponse {
  expiresAt: string;
  isUsed: boolean;
  status: "pending" | "approved" | "rejected";
  _id: string;
  key: string;
  service: {
    _id: string;
    image: string;
    category: string | null;
    title: string;
    description: string;
  };
  serviceProvider: {
    _id: string;
    name: string;
    image: string;
    contact: string | null;
  };
}

export interface RatingData {
  rating: number;
  status: "pending" | "approved" | "rejected";
  ratingInfo: {
    service: string;
    user: string;
  };
  serviceId: string;
  providerId: string;
  serviceTitle: string;
  providerName: string;
  providerImage: string;
  service: {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    serviceProvider: {
      _id: string;
      name: string;
      description: string;
      email: string;
      image: string;
      contact?: string;
    };
  };
}

export default function RatingPage() {
  const { toast } = useToast();
  const [ratingData, setRatingData] = useState<RatingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const ratingKey = params.key;

  useEffect(() => {
    const fetchRatingKeyData = async () => {
      try {
        if (!ratingKey) {
          throw new Error("No rating key provided");
        }

        const response = await fetch(`/api/rating-key/${ratingKey}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`
          );
        }

        const data: ApiResponse = await response.json();

        // Check if rating request is approved
        if (data.status !== "approved") {
          throw new Error(
            data.status === "pending"
              ? "This rating request is pending approval from the service provider."
              : "This rating request has been rejected or is no longer valid."
          );
        }

        // Validate the required fields are present
        if (!data.service?._id || !data.serviceProvider?._id) {
          throw new Error(
            "Invalid data structure: missing required service or provider data"
          );
        }

        const transformedData: RatingData = {
          rating: 0,
          status: data.status,
          ratingInfo: {
            service: data.service._id,
            user: data._id,
          },
          serviceId: data.service._id,
          providerId: data.serviceProvider._id,
          serviceTitle: data.service.title,
          providerName: data.serviceProvider.name,
          providerImage: data.serviceProvider.image || "",
          service: {
            _id: data.service._id,
            title: data.service.title,
            description: data.service.description || "",
            category: data.service.category || "",
            image: data.service.image || "",
            serviceProvider: {
              _id: data.serviceProvider._id,
              name: data.serviceProvider.name,
              description: "",
              email: "",
              image: data.serviceProvider.image || "",
              contact: data.serviceProvider.contact || "",
            },
          },
        };

        setRatingData(transformedData);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        console.error("Error fetching rating data:", error);
        setError(errorMessage);
        toast({
          title: "Error Loading Rating",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRatingKeyData();
  }, [ratingKey, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading rating information...</p>
      </div>
    );
  }

  if (error || !ratingData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error || "Invalid rating key"}</p>
      </div>
    );
  }

  return (
    <RatingAndReviewComponent
      ratingKey={params.key as string}
      ratingInfo={{
        service: {
          description: ratingData.service.description,
          name: ratingData.service.serviceProvider.name,
          title: ratingData.service.title,
          category: ratingData.service.category,
          image: ratingData.service.image,
          _id: ratingData.service._id,
          provider: {
            name: ratingData.service.serviceProvider.name,
            image: ratingData.service.serviceProvider.image,
            _id: ratingData.service.serviceProvider._id,
          },
        },
        serviceId: ratingData.serviceId,
        serviceTitle: ratingData.serviceTitle,
      }}
      serviceId={ratingData.serviceId}
      providerId={ratingData.providerId}
      serviceData={{
        title: ratingData.service.title,
        image: ratingData.service.image,
        category: ratingData.service.category,
        description: ratingData.service.description,
      }}
      providerData={{
        name: ratingData.service.serviceProvider.name,
        image: ratingData.service.serviceProvider.image,
        contact: {
          email: ratingData.service.serviceProvider.email || "",
        },
      }}
    />
  );
}
