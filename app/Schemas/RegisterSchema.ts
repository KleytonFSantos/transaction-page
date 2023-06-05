import { z } from "zod";

export const formSchema = z
  .object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    name: z.string().min(1, "Username is required").max(100),
    password: z
      .string()
      .min(1, "Password is required")
      .min(5, "Password must have more than or 5 characters"),
    password_confirmation: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["password_confirmation"],
    message: "Passwords do not match",
  });