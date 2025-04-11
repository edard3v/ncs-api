import { HTTPException } from "hono/http-exception";

export class EmailErr extends HTTPException {
  constructor() {
    super(400, { message: "Email no disponible." });
    this.name = "EmailErr";
  }
}
