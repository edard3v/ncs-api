import type { MiddlewareHandler } from "hono";
import type { JwtPayload } from "jsonwebtoken";
import { Unauthorized } from "@errors/Unauthorized.ts";
import { BearerErr } from "@errors/BearerErr.ts";
import { Jwt } from "@services/tokens/jwt.ts";

export const verify_auth: MiddlewareHandler<T> = async (context, next) => {
  const Authorization = context.req.header("Authorization");
  if (!Authorization) throw new Unauthorized();

  const [prefix, token] = Authorization.split(" ");
  if (prefix !== "Bearer") throw new BearerErr();
  if (!token) throw new Unauthorized();

  const token_payload = Jwt.verify(token) as JwtPayload;

  context.set("token_payload", token_payload);

  await next();
};

type T = {
  Variables: { token_payload: JwtPayload };
};
