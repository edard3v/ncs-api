import { Hono } from "hono";
import { verify_auth } from "../../../middlewares/verify_auth.ts";
import { refresh_login_service } from "./refresh_login_service.ts";

export const refresh_login_module = new Hono();

refresh_login_module.post(
  "",

  verify_auth,

  // Controller
  (context) => {
    const tokenPayload = context.get("tokenPayload");
    const newToken = refresh_login_service(tokenPayload);
    return context.json({ token: newToken });
  }
);
