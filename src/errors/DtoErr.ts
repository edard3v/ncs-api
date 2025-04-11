import { HTTPException } from "hono/http-exception";

export class DtoErr extends HTTPException {
  constructor() {
    super(400, { message: "Error de DTO" });
    this.name = "DtoErr";
  }
}
