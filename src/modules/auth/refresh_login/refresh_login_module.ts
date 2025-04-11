import { Hono } from "hono";
import { refresh_login_service } from "./refresh_login_service.ts";
import { verify_auth } from "@middlewares/verify_auth.ts";

export const refresh_login_module = new Hono();

refresh_login_module.post(
  "",

  verify_auth,

  // Controller
  (context) => {
    const token_payload = context.get("token_payload");
    const newToken = refresh_login_service(token_payload);
    return context.json({ token: newToken });
  }
);
