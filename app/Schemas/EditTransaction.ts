import { z } from "zod";

export const transactionSchema = z
  .object({
    description: z.string().min(1, { message: 'description cannot be empty'}),
    type: z
      .string().min(1, { message: "category needs to be expense or income"}),
    amount: z.any(),
  });