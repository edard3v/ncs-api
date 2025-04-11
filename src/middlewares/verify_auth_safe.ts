import type { MiddlewareHandler } from "hono";
import { BearerErr } from "@errors/BearerErr.ts";
import { Unauthorized } from "@errors/Unauthorized.ts";
import { TokenPayload } from "@modules/auth/login/login_service.ts";
import { Jwt } from "@services/tokens/jwt.ts";

export const verify_auth_safe: MiddlewareHandler<T> = async (context, next) => {
  const Authorization = context.req.header("Authorization");

  if (Authorization) {
    const [prefix, token] = Authorization?.split(" ") || [];
    if (prefix !== "Bearer") throw new BearerErr();
    if (!token) throw new Unauthorized();
    const token_payload = Jwt.verify(token) as TokenPayload;
    context.set("token_payload", token_payload);
  }

  await next();
};

type T = {
  Variables: { token_payload?: TokenPayload };
};
