import type { MiddlewareHandler } from "hono";
import { Role } from "@db/enums/Role.ts";
import { UnauthorizedRole } from "@errors/UnauthorizedRole.ts";
import { TokenPayload } from "@modules/auth/login/login_service.ts";

export const verify_role = (role: Role): MiddlewareHandler<T> => {
  return async (context, next) => {
    const token = context.get("token_payload");
    if (!token || !token.role || token.role !== role) {
      throw new UnauthorizedRole();
    }

    await next();
  };
};

type T = {
  Variables: { token_payload: TokenPayload };
};
