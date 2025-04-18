import { Hono } from "hono";
import { CORS } from "@app/config.ts";
import { welcome_module } from "@modules/welcome/welcome_module.ts";
import { start_register_module } from "@modules/auth/start_register/start_register_module.ts";
import { end_register_module } from "@modules/auth/end_register/end_register_module.ts";
import { login_module } from "@modules/auth/login/login_module.ts";
import { refresh_login_module } from "@modules/auth/refresh_login/refresh_login_module.ts";
import { not_found_handler } from "@app/not_found_handler.ts";
import { err_handler } from "@app/err_handler.ts";
import { create_song_module } from "@modules/songs/create_song/create_song_module.ts";
import { read_songs_module } from "@modules/songs/read_songs/read_songs_module.ts";
import { delete_song_module } from "@modules/songs/delete_song/delete_song_module.ts";
import { get_songs_module } from "@modules/songs/get_songs/get_songs_module.ts";

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

app.route("/create_song", create_song_module);
app.route("/read_songs", read_songs_module);
app.route("/delete_song", delete_song_module);

app.route("/get_songs", get_songs_module);

app.notFound(not_found_handler);
app.onError(err_handler);
