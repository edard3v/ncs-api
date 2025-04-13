import { Hono } from "hono";
import { verify_auth } from "@middlewares/verify_auth.ts";
import { verify_role } from "@middlewares/verify_role.ts";
import { Role } from "@db/enums/Role.ts";

export const create_song_module = new Hono();

create_song_module.post(
  "/",
  verify_auth,
  verify_role(Role.admin),

  (context) => {
    return context.json({ msg: "" });
  }
);
