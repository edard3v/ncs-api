import { HTTPException } from "hono/http-exception";

export class CloudinaryUrlErr extends HTTPException {
  constructor() {
    super(400, { message: "La url requiere tener un query public_id" });
    this.name = "CloudinaryUrlErr";
  }
}
