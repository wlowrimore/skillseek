import { auth } from "@/auth";
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
