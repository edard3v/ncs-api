import { z } from "zod";
import { name_song_zod } from "@utils/zod/name_song_zod.ts";
import { uuid_zod } from "@utils/zod/uuid_zod.ts";
import { page_zod } from "@utils/zod/page_zod.ts";
import { limit_zod } from "@utils/zod/limit_zod.ts";

export const read_songs_dto = z
  .object({
    name: name_song_zod,
    author_id: uuid_zod,
    page: page_zod,
    limit: limit_zod,
  })
  .partial()
  .strict();

export type ReadSongsDto = z.infer<typeof read_songs_dto>;
