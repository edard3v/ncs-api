import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verify_auth } from "@middlewares/verify_auth.ts";
import { verify_role } from "@middlewares/verify_role.ts";
import { Role } from "@db/enums/Role.ts";
import { read_songs_service } from "@modules/songs/read_songs/read_songs_service.ts";
import { read_songs_dto } from "@modules/songs/read_songs/read_songs_dto.ts";

export const read_songs_module = new Hono();

read_songs_module.get(
  "/",
  verify_auth,
  verify_role(Role.admin),
  zValidator("query", read_songs_dto),

  async (context) => {
    const queries = context.req.valid("query");
    const records = await read_songs_service(queries);
    return context.json(records);
  }
);
