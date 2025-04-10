import jwt, { SignOptions } from "jsonwebtoken";
import { TokenErr } from "../../errors/TokenErr.ts";

export class Jwt {
  static secret = Deno.env.get("SECRET_JWT");
  static expires_in = "1w";

  static verify(token: string) {
    if (!this.secret) throw new TypeError("No ha init SECRET (.env)");

    try {
      return jwt.verify(token, this.secret);
    } catch {
      throw new TokenErr();
    }
  }

  static sign(payload: object, options?: SignOptions) {
    if (!this.secret) throw new TypeError("No ha init SECRET (.env)");

    // @ts-ignore: Deno is 🙄
    return jwt.sign(payload, this.secret, {
      expiresIn: this.expires_in,
      ...options,
    });
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}
