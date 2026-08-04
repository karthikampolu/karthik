import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const callRequestSchema = z.object({
  name: z.string().min(1, "Name is required."),
  phone: z.string().min(6, "Enter a valid phone number."),
  message: z.string().optional(),
});

export type CallRequestInput = z.infer<typeof callRequestSchema>;
