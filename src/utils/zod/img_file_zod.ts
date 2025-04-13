import { z } from "zod";

export const img_file_zod = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: "El archivo no puede estar vacío",
  })
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "La imagen no debe superar los 5MB",
  });
