import { z } from "zod";

export const name_song_zod = z
  .string()
  .min(1, { message: "Mín 1 digíto." })
  .max(255, { message: "Max 50 digítos." });
