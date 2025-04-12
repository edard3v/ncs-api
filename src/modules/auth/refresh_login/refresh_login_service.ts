import type { JwtPayload } from "jsonwebtoken";
import { Jwt } from "@services/tokens/jwt.ts";

export const refresh_login_service = (token_payload: JwtPayload) => {
  // deno-lint-ignore no-unused-vars
  const { iat, exp, aud, iss, jti, nbf, sub, ...rest } = token_payload;

  const new_token = Jwt.sign({ ...rest });

  return new_token;
};
