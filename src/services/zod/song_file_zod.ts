import { z } from "zod";

export const song_file_zod = z
  .instanceof(File)
  .refine((file) => file.size > 0, {
    message: "El archivo no puede estar vacío",
  })
  .refine((file) => file.size <= 25 * 1024 * 1024, {
    message: "El archivo no debe superar los 25MB (máx. 10 minutos de duración)",
  });
