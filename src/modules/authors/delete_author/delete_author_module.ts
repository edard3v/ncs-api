import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { param_id_zod } from "@/services/zod/param_id_zod.ts";
import { delete_author_service } from "@/modules/authors/delete_author/delete_author_service.ts";
import { verify_auth } from "@/middlewares/verify_auth.ts";
import { verify_role } from "@/middlewares/verify_role.ts";
import { Role } from "@/enums/Role.ts";

export const delete_author_module = new Hono();

delete_author_module.delete(
  "/:id",
  verify_auth,
  verify_role(Role.admin),
  zValidator("param", param_id_zod),

  async (context) => {
    const { id } = context.req.valid("param");

    const row_affected = await delete_author_service(id);
    return context.json({ row_affected });
  },
);
