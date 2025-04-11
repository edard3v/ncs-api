import { HTTPException } from "hono/http-exception";

export class TokenErr extends HTTPException {
  constructor() {
    super(401, { message: "Token invalido." });
    this.name = "TokenErr";
  }
}
