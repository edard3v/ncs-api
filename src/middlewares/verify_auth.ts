import type { MiddlewareHandler } from "hono";
import { Unauthorized } from "@/errors/Unauthorized.ts";
import { BearerErr } from "@/errors/BearerErr.ts";
import { TokenPayload } from "@/modules/auth/login/login_service.ts";
import { Jwt } from "@/services/tokens/jwt.ts";

export const verify_auth: MiddlewareHandler<T> = async (context, next) => {
  const authorization = context.req.header("Authorization");
  if (!authorization) throw new Unauthorized();

  const [prefix, token] = authorization.split(" ");
  if (prefix !== "Bearer") throw new BearerErr();
  if (!token) throw new Unauthorized();

  const token_payload = Jwt.verify(token) as TokenPayload;

  context.set("token_payload", token_payload);

  await next();
};

type T = {
  Variables: { token_payload: TokenPayload };
};
