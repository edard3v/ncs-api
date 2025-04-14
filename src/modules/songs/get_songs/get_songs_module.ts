import { Hono } from "hono";
import { get_songs_service } from "@modules/songs/get_songs/get_songs_services.ts";
import { zValidator } from "@hono/zod-validator";
import { get_songs_dto } from "@modules/songs/get_songs/get_songs_dto.ts";

export const get_songs_module = new Hono();

get_songs_module.get("/", zValidator("query", get_songs_dto), async (context) => {
  const queries = context.req.valid("query");
  const songs = await get_songs_service(queries);

  return context.json(songs);
});
