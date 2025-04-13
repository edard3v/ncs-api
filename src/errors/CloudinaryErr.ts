import { HTTPException } from "hono/http-exception";

export class CloudinaryErr extends HTTPException {
  constructor() {
    super(500, { message: "Cloudinary error" });
    this.name = "CloudinaryErr";
  }
}
