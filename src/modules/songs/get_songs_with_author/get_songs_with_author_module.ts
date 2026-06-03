import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { get_songs_with_author_dto } from "@/modules/songs/get_songs_with_author/get_songs_with_author_dto.ts";
import { get_songs_with_author_service } from "@/modules/songs/get_songs_with_author/get_songs_with_author_service.ts";

export const get_songs_with_author_module = new Hono();

get_songs_with_author_module.get(
  "/",

  zValidator("query", get_songs_with_author_dto),

  async (context) => {
    const queries = context.req.valid("query");
    const songs = await get_songs_with_author_service(queries);

    return context.json(songs);
  },
);
