import { Hono } from "hono";
import { verify_auth } from "@/middlewares/verify_auth.ts";
import { verify_role } from "@/middlewares/verify_role.ts";
import { zValidator } from "@hono/zod-validator";
import { Role } from "@/enums/Role.ts";
import { param_id_zod } from "@/services/zod/param_id_zod.ts";
import { update_song_dto } from "@/modules/songs/update_song/update_song_dto.ts";
import { update_song_service } from "@/modules/songs/update_song/update_song_service.ts";

export const update_song_module = new Hono();

update_song_module.patch(
  "/:id",

  verify_auth,
  verify_role(Role.admin),
  zValidator("param", param_id_zod),
  zValidator("form", update_song_dto),

  async (context) => {
    const { id } = context.req.valid("param");
    const dto = context.req.valid("form");
    const row_affected = await update_song_service(id, dto);
    return context.json({ row_affected });
  },
);
