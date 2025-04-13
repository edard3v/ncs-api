import { Hono } from "hono";
import { verify_auth } from "@middlewares/verify_auth.ts";
import { verify_role } from "@middlewares/verify_role.ts";
import { Role } from "@db/enums/Role.ts";
import { zValidator } from "@hono/zod-validator";
import { create_song_dto } from "@modules/songs/create_song/create_song_dto.ts";
import { create_song_service } from "@modules/songs/create_song/create_song_service.ts";

export const create_song_module = new Hono();

create_song_module.post(
  "/",
  verify_auth,
  verify_role(Role.admin),
  zValidator("form", create_song_dto),

  async (context) => {
    const dto = context.req.valid("form");
    await create_song_service(dto);
    return context.json({ msg: "Canción creada correctamente" });
  }
);
