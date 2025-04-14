import { Hono } from "hono";
import { read_song_service } from "@modules/songs/read_song/read_song_service.ts";
import { zValidator } from "@hono/zod-validator";
import { read_song_dto } from "@modules/songs/read_song/read_song_dto.ts";
import { verify_auth } from "@middlewares/verify_auth.ts";
import { verify_role } from "@middlewares/verify_role.ts";
import { Role } from "@db/enums/Role.ts";

export const read_song_module = new Hono();

read_song_module.get(
  "/",
  verify_auth,
  verify_role(Role.admin),
  zValidator("query", read_song_dto),

  async (context) => {
    const queries = context.req.valid("query");
    const records = await read_song_service(queries);
    return context.json(records);
  }
);
