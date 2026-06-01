import { HTTPException } from "hono/http-exception";

export class Unauthorized extends HTTPException {
  constructor() {
    super(401, { message: "No autorizado." });
    this.name = "Unauthorized";
  }
}
