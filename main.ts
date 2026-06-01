import { app } from "./src/app/app.ts";
import { API_BASE_URL, ENV, PORT } from "./src/app/config.ts";

Deno.serve(
  {
    port: PORT,
    onListen() {
      console.table({
        entorno: ENV,
        server: API_BASE_URL,
      });
    },
  },
  app.fetch,
);
