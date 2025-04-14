import { Hono } from "hono";
import { verify_auth } from "@middlewares/verify_auth.ts";
import { verify_role } from "@middlewares/verify_role.ts";
import { Role } from "@db/enums/Role.ts";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { uuid_zod } from "@utils/zod/uuid_zod.ts";
import { delete_song_service } from "@modules/songs/delete_song/delete_song_service.ts";
import { UUID } from "node:crypto";

export const delete_song_module = new Hono();

delete_song_module.delete(
  ":id",

  verify_auth,
  verify_role(Role.admin),
  zValidator("param", z.object({ id: uuid_zod })),

  async (context) => {
    const { id } = context.req.valid("param");
    await delete_song_service(id as UUID);
    return context.json({ msg: "Canción borrada correctamente" });
  }
);
