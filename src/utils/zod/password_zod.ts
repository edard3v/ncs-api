import { z } from "zod";

export const password_zod = z
  .string()
  .min(6, { message: "Mín 6 dígitos." })
  .max(64, { message: "Max 64 dígitos." });
