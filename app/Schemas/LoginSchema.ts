import { z } from "zod";

export const loginSchema = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(5, "Password must have more than or 5 characters"),
  });