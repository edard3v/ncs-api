import { app } from "./src/app/app.ts";
import { IS_PRODUCTION, PORT } from "./src/app/config.ts";

Deno.serve(
  {
    port: PORT,
    onListen() {
      console.table({
        is_production: IS_PRODUCTION,
        server: Deno.env.get("API_BASE_URL"),
      });
    },
  },
  app.fetch
);
