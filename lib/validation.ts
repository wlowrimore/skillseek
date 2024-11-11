import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(500, "Description must be less than 500 characters"),
  category: z
    .string()
    .min(3, "Category must be at least 3 characters")
    .max(20, "Category must be less than 20 characters"),
  link: z
    .string()
    .url("Please enter a valid URL")
    .refine((url) => {
      // Basic image URL validation - checks if the URL ends with common image extensions
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".webp",
        ".svg",
      ];
      return (
        imageExtensions.some((ext) => url.toLowerCase().endsWith(ext)) ||
        url.toLowerCase().includes("images.unsplash.com") ||
        url.toLowerCase().includes("imgur.com") ||
        url.toLowerCase().includes("cloudinary.com")
      );
    }, "Please provide a valid image URL"),
  pitch: z.string().min(10, "Pitch must be at least 10 characters"),
});

export type FormData = z.infer<typeof formSchema>;
