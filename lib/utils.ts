import { auth } from "../auth";
import { client } from "@/sanity/lib/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function displayTagName() {
  const session = await auth();
  const email = session?.user?.email;
  const nameTag = email?.split("@")[0].toLowerCase();
  return `@${nameTag}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export function timeLimit(time: number) {
  const timer = setTimeout(() => {});
}

export function extractPublicIdFromUrl(url: string) {
  try {
    const match = url.match(/https?:\/\/[^\/]+\/([^\/]+)/);
    return match ? match[1] : null;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
}

// CALCULATE AVERAGE RATING

export async function calculateAverageRating(ratings: any[]) {
  try {
    if (!ratings || ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return sum / ratings.length;
  } catch (error) {
    console.error("Error calculating average rating:", error);
    return 0;
  }
}

// CREATE USER UTILITY FUNCTION

export const createValidId = (email: string) => {
  return `author-${email.replace(/[@.]/g, "-")}`;
};

export const createOrUpdateUser = async (userData: {
  email: string;
  name: string;
  image?: string;
}) => {
  const userId = createValidId(userData.email);

  try {
    // Check if user exists
    const existingUser = await client.fetch(
      `*[_type == "author" && _id == $userId][0]`,
      { userId }
    );

    if (!existingUser) {
      // Create new user
      const newUser = {
        _id: userId,
        _type: "author",
        name: userData.name,
        email: userData.email,
        image: userData.image || "",
        roles: ["user"],
      };

      console.log("Creating new user:", newUser);
      await client.createIfNotExists(newUser);
      return newUser;
    }

    // Update existing user
    const updatedUser = {
      ...existingUser,
      name: userData.name,
      image: userData.image || existingUser.image,
    };

    console.log("Updating existing user:", updatedUser);
    await client.patch(userId).set(updatedUser).commit();
    return updatedUser;
  } catch (error) {
    console.error("Error in createOrUpdateUser:", error);
    throw error;
  }
};

// ENVIRONMENT VARIABLES CONFIGURATION

export const env = {
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    process.env.SANITY_STUDIO_PROJECT_ID,
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET,
  apiVersion:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ||
    process.env.SANITY_STUDIO_API_VERSION ||
    "2024-01-01",
};

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}

export const sanityConfig = {
  projectId: assertValue(env.projectId, "Missing Sanity Project ID"),
  dataset: assertValue(env.dataset, "Missing Sanity Dataset"),
  apiVersion: env.apiVersion,
};
