import { Hono } from "hono";
import { welcome_service } from "./welcome_service.ts";

export const welcome_module = new Hono();

welcome_module.get("/", (context) => {
  const msg = welcome_service();
  return context.text(msg);
});
