import type { JwtPayload } from "jsonwebtoken";
import { JWT } from "../../../services/tokens/jwt.ts";

export const refresh_login_service = (tokenPayload: JwtPayload) => {
  // deno-lint-ignore no-unused-vars
  const { iat, exp, aud, iss, jti, nbf, sub, ...rest } = tokenPayload;

  const newToken = JWT.sign({ ...rest });

  return newToken;
};
