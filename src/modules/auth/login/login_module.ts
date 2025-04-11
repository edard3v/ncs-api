import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { login_dto } from "./login_dto.ts";
import { login_service } from "./login_service.ts";

export const login_module = new Hono();

login_module.post(
  "",

  zValidator("json", login_dto),

  // Controller
  async (context) => {
    const credentials = context.req.valid("json");
    const token = await login_service(credentials);
    return context.json({ token });
  }
);
