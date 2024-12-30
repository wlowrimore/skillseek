"use client";

import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";
import {
  SERVICE_BY_ID_QUERY,
  SERVICE_BY_RATING_KEY_QUERY,
} from "@/sanity/lib/queries";
import { ServiceTypeCard } from "./ServiceCard";
import { RatingData } from "@/app/(root)/rate/[key]/page";
import Image from "next/image";
import { useState, useEffect } from "react";

const ServiceProfileRateComponent = (): JSX.Element => {
  // const params = useParams();
  const [service, setService] = useState<ServiceTypeCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceData = async () => {
      if (!service || service._id) return;

      try {
        setIsLoading(true);
        const fetchedService = await client.fetch(SERVICE_BY_RATING_KEY_QUERY, {
          id: service._id,
        });
        console.log("ID SERVICE.ID:", service._id),
          console.log("Fetched service:", fetchedService);
        setService(fetchedService);
      } catch (err) {
        console.error("Error fetching service:", err);
        setError(err instanceof Error ? err.message : "Failed to load service");
      } finally {
        setIsLoading(false);
      }
      console.log("Fetching service data for SERVICE_ID:", service._id);
    };

    fetchServiceData();
  }, [service?._id]);

  if (isLoading) {
    return <div>Loading service details...</div>;
  }

  if (error) {
    return <div>Error loading service: {error}</div>;
  }

  if (!service) {
    return <div>No service found</div>;
  }

  return (
    <section className="flex flex-col gap-10 min-h-screen">
      <div className="space-y-4">
        {service?.image && (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={service?.image}
              alt={service?.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        )}
        <h2 className="text-2xl font-bold">{service?.title}</h2>
        {service?.author && (
          <p className="text-gray-600">By: {service?.author.name}</p>
        )}
        <p className="text-gray-700">{service?.description}</p>
      </div>
    </section>
  );
};

export default ServiceProfileRateComponent;
