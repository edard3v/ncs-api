import { z } from "zod";

export const file_zod = z.instanceof(File).refine((file) => file.size > 0, {
  message: "El archivo no puede estar vacío",
});
