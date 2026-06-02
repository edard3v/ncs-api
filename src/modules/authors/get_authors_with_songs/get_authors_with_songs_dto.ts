import z from "zod";
import { page_zod } from "@/services/zod/page_zod.ts";
import { limit_zod } from "@/services/zod/limit_zod.ts";
import { name_zod } from "@/services/zod/name_zod.ts";

// query que puede traer la req
export const get_authors_with_songs_dto = z
  .object({
    page: page_zod,
    limit: limit_zod,
    name: name_zod,
  })
  .partial()
  .strict();

export type GetAuthorsWithSongsDto = z.infer<typeof get_authors_with_songs_dto>;
