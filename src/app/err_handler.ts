import { ErrorHandler } from "hono/types";
import { HTTPException } from "hono/http-exception";

export const err_handler: ErrorHandler = (err, context) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  console.log(err);
  context.status(500);
  return context.text(err.name);
};
