import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  image: z.string().url(), // Validates that it's a valid URL
  pitch: z.string().min(1),
});

export const contactFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export type FormData = z.infer<typeof formSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
