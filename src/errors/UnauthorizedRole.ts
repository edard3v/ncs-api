import { HTTPException } from "hono/http-exception";

export class UnauthorizedRole extends HTTPException {
  constructor() {
    super(403, { message: "Rol no autorizado." });
    this.name = "UnauthorizedRole";
  }
}
