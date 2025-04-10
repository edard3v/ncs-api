import { defineConfig } from "drizzle-kit";
import { IS_PRODUCTION } from "./src/app/config.ts";

export const DATABASE_URL = !IS_PRODUCTION
  ? "postgres://postgres:edar@localhost:5432/template"
  : Deno.env.get("DATABASE_URL")!;

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: { url: DATABASE_URL },
  introspect: { casing: "preserve" },
});
