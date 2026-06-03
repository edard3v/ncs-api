import { z } from "zod";
import { name_zod } from "@/services/zod/name_zod.ts";
import { page_zod } from "@/services/zod/page_zod.ts";
import { limit_zod } from "@/services/zod/limit_zod.ts";
import { uuid_zod } from "@/services/zod/uuid_zod.ts";

export const get_songs_dto = z
  .object({
    name: name_zod,
    page: page_zod,
    limit: limit_zod,
    author_id: uuid_zod,
  })
  .partial()
  .strict();

export type GetSongsDto = z.infer<typeof get_songs_dto>;
