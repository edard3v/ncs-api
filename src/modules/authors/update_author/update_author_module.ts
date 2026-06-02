import { Hono } from "hono";
import { verify_auth } from "@/middlewares/verify_auth.ts";
import { verify_role } from "@/middlewares/verify_role.ts";
import { zValidator } from "@hono/zod-validator";
import { Role } from "@/enums/Role.ts";
import { update_author_dto } from "@/modules/authors/update_author/update_author_dto.ts";
import { update_author_service } from "@/modules/authors/update_author/update_author_service.ts";
import { param_id_zod } from "@/services/zod/param_id_zod.ts";

export const update_author_module = new Hono();

update_author_module.patch(
  "/:id",

  verify_auth,
  verify_role(Role.admin),
  zValidator("param", param_id_zod),
  zValidator("form", update_author_dto),

  async (context) => {
    const { id } = context.req.valid("param");
    const dto = context.req.valid("form");
    const row_affected = await update_author_service(id, dto);
    return context.json({ row_affected });
  },
);
