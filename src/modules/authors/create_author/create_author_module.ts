import { Hono } from "hono";
import { create_author_service } from "@/modules/authors/create_author/create_author_service.ts";
import { verify_auth } from "@/middlewares/verify_auth.ts";
import { verify_role } from "@/middlewares/verify_role.ts";
import { Role } from "@/enums/Role.ts";
import { zValidator } from "@hono/zod-validator";
import { create_author_dto } from "@/modules/authors/create_author/create_author_dto.ts";

export const create_author_module = new Hono();

create_author_module.post(
  "/",
  verify_auth,
  verify_role(Role.admin),
  zValidator("form", create_author_dto),

  async (context) => {
    const dto = context.req.valid("form");
    const row_affected = await create_author_service(dto);
    return context.json({ row_affected });
  },
);
