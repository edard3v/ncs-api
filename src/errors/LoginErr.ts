import { HTTPException } from "hono/http-exception";

export class LoginErr extends HTTPException {
  constructor() {
    super(401, { message: "Inicio de sesión invalido" });
    this.name = "LoginErr";
  }
}
