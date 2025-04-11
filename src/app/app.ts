import { Hono } from "hono";
import { CORS } from "@app/config.ts";
import { welcome_module } from "@modules/welcome/welcome_module.ts";
import { start_register_module } from "@modules/auth/start_register/start_register_module.ts";
import { end_register_module } from "@modules/auth/end_register/end_register_module.ts";
import { login_module } from "@modules/auth/login/login_module.ts";
import { refresh_login_module } from "@modules/auth/refresh_login/refresh_login_module.ts";
import { not_found_handler } from "@app/not_found_handler.ts";
import { err_handler } from "@app/err_handler.ts";

export const app = new Hono();

app.use("/*", CORS);
app.use("/*", async (context, next) => {
  console.log(context.req.method, context.req.path);

  await next();
});

app.route("/", welcome_module);
app.route("/start_register", start_register_module);
app.route("/end_register", end_register_module);
app.route("/login", login_module);
app.route("/refresh_login", refresh_login_module);

app.notFound(not_found_handler);
app.onError(err_handler);
