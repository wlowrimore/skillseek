import { auth } from "@/auth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function displayNameTag() {
  const session = await auth();
  if (session && session?.user?.email) {
    const nameTag = session.user.email.split("@")[0].toLowerCase();
    return `@${nameTag}`;
  } else {
    return "@Anonymous".toLowerCase();
  }
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
