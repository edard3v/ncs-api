import { Hono } from "hono";
import { verify_auth } from "@/middlewares/verify_auth.ts";
import { zValidator } from "@hono/zod-validator";
import { param_id_zod } from "@/services/zod/param_id_zod.ts";
import { verify_role } from "@/middlewares/verify_role.ts";
import { Role } from "@/enums/Role.ts";
import { delete_song_service } from "@/modules/songs/delete_song/delete_song_service.ts";

export const delete_song_module = new Hono();

delete_song_module.delete(
  "/:id",
  verify_auth,
  verify_role(Role.admin),
  zValidator("param", param_id_zod),

  async (context) => {
    const { id } = context.req.valid("param");

    const row_affected = await delete_song_service(id);
    return context.json({ row_affected });
  },
);
