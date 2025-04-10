import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { start_register_dto, StartRegisterDto } from "../start_register/start_register_dto.ts";
import { JWT } from "../../../services/tokens/jwt.ts";
import { end_register_service } from "./end_register_service.ts";

export const end_register_module = new Hono<{
  Variables: { credentials: StartRegisterDto };
}>();

end_register_module.get(
  "/:token",

  zValidator("param", z.object({ token: z.string() }).strict()),

  async (context, next) => {
    const { token } = context.req.valid("param");
    const decoded = JWT.verify(token);
    const credentials = start_register_dto.passthrough().parse(decoded);
    context.set("credentials", credentials);

    await next();
  },

  // Controller
  async (context) => {
    const credentials = context.get("credentials");
    await end_register_service(credentials);
    return context.json({ msg: "¡Enhorabuena! Se ha registrado correctamente." });
  }
);
