import { z } from "zod";
import { name_song_zod } from "@/services/zod/name_song_zod.ts";
import { song_file_zod } from "@/services/zod/song_file_zod.ts";
import { img_file_zod } from "@/services/zod/img_file_zod.ts";

export const update_song_dto = z
  .object({
    name: name_song_zod,
    song_file: song_file_zod,
    img_file: img_file_zod,
    duration: z.coerce.number(),
  })
  .partial()
  .strict();

export type UpdateSongDto = z.infer<typeof update_song_dto>;
