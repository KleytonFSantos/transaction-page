import { z } from "zod";

export const filterTransactionSchema = z
  .object({
    description: z.string().default("").nullable(),
    dateFrom: z.any(),
    dateTo: z.any(),
    type: z.string().nullable(),
    orderBy: z.string().nullable(),
    orderTo: z.string().nullable(),
  });