import { z } from "zod";

export const file_zod = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: "El archivo no puede estar vacío",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "El archivo no debe superar los 5MB",
  });
