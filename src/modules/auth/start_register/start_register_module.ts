import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { start_register_dto } from "./start_register_dto.ts";
import { start_register_service } from "./start_register_service.ts";

export const start_register_module = new Hono();

start_register_module.post(
  "/",

  zValidator("json", start_register_dto),

  // Controller
  async (context) => {
    const credentials = context.req.valid("json");
    await start_register_service(credentials);
    return context.json({ msg: "Email de verificación enviando correctamente." });
  }
);
