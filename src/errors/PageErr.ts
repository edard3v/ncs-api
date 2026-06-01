import { HTTPException } from "hono/http-exception";

export class PageErr extends HTTPException {
  constructor() {
    super(400, {
      message: "No existe esta página",
    });
    this.name = "PageErr";
  }
}
