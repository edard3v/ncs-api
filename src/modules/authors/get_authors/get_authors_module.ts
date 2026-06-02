import { Hono } from "hono";
import { get_authors_dto } from "@/modules/authors/get_authors/get_authors_dto.ts";
import { zValidator } from "@hono/zod-validator";
import { get_authors_service } from "@/modules/authors/get_authors/get_authors_service.ts";

export const get_authors_module = new Hono();

get_authors_module.get(
  "",

  zValidator("query", get_authors_dto),
  // Controller
  async (context) => {
    const dto = context.req.valid("query");
    const authors = await get_authors_service(dto);

    return context.json(authors);
  },
);
