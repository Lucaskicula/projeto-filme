import { z } from "zod";

export const searchSchema = z.object({
  query: z
    .string()
    .min(2, "Digite pelo menos 2 caracteres"),
});