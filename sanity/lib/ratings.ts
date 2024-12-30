import { RatingData } from "@/components/RatingsComp";
import { client } from "./client";

export async function checkCanRateService(userId: string, serviceId: string) {
  const query = `*[_type == "serviceUsage" && 
      user._ref == $userId && 
      service._ref == $serviceId && 
      !hasRated][0]`;

  const result = await client.fetch(query, { userId, serviceId });
  return !!result;
}

export async function submitRating({
  userId,
  serviceId,
  serviceProviderId,
  rating,
  comment,
}: {
  userId: string;
  serviceId: string;
  serviceProviderId: string;
  rating: number;
  comment: string;
}) {
  // Create a transaction to update all related documents
  const transaction = client.transaction();

  // 1. Create the rating document
  transaction.create({
    _type: "rating",
    user: { _type: "reference", _ref: userId },
    service: { _type: "reference", _ref: serviceId },
    serviceProvider: { _type: "reference", _ref: serviceProviderId },
    rating,
    comment,
    createdAt: new Date().toISOString(),
  });

  // 2. Update the service usage to mark as rated
  const usageQuery = `*[_type == "serviceUsage" && user._ref == $userId && service._ref == $serviceId][0]._id`;
  const usageDoc = await client.fetch(usageQuery, { userId, serviceId });

  if (usageDoc) {
    transaction.patch(usageDoc, {
      set: { hasRated: true },
    });
  }

  // 3. Get current ratings for this service
  const currentRatings = await client.fetch(
    `
      *[_type == "rating" && 
        serviceProvider._ref == $serviceProviderId && 
        service._ref == $serviceId] {
        rating
      }
    `,
    { serviceProviderId, serviceId }
  );

  const totalRatings = currentRatings.length + 1;
  const sumRatings = currentRatings.reduce(
    (sum: number, r: any) => sum + r.rating,
    rating
  );
  const averageRating = sumRatings / totalRatings;

  // 4. Update the service provider's average rating
  transaction.patch(serviceProviderId, {
    set: {
      [`serviceRatings[service._ref == "${serviceId}"]`]: {
        service: { _type: "reference", _ref: serviceId },
        averageRating,
        totalRatings,
      },
    },
  });

  try {
    await transaction.commit();
    return { success: true };
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw new Error("Failed to submit rating");
  }
}

// Helper function to get service ratings
export async function getServiceRatings(serviceId: string) {
  const query = `*[_type == "rating" && service._ref == $serviceId] {
      rating,
      comment,
      createdAt,
      user->{
        name,
        image
      }
    } | order(createdAt desc)`;
  const ratings = await client.fetch(query, { serviceId });
  const averageRating =
    ratings.reduce((acc: number, rating: any) => acc + rating.rating, 0) /
    ratings.length;
  return { ratings, averageRating };
}

// Helper function to get average rating for a service provider
export async function getProviderAverageRating(providerId: string) {
  const query = `*[_type == "author" && _id == $providerId][0] {
      serviceRatings[] {
        service->{
          title
        },
        averageRating,
        totalRatings
      }
    }`;

  return client.fetch(query, { providerId });
}
