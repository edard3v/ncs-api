import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { get_author_by_id_service } from "@/modules/authors/get_author_by_id/get_author_by_id_service.ts";
import { param_id_zod } from "@/services/zod/param_id_zod.ts";

export const get_author_by_id_module = new Hono();

get_author_by_id_module.get("/:id", zValidator("param", param_id_zod), async (context) => {
  const { id } = context.req.valid("param");

  const author = await get_author_by_id_service(id);
  return context.json(author);
});
