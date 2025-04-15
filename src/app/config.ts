import { cors } from "hono/cors";

export const PORT = Number(Deno.env.get("PORT")) || 3001;
export const IS_PRODUCTION = Deno.env.get("ENV") === "production";
export const CORS = cors({
  origin: ["*"],
  allowMethods: ["POST", "GET", "UPDATE", "PUT", "DELETE"],
  maxAge: 600,
  credentials: true,
});
