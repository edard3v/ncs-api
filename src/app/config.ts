import { cors } from "hono/cors";

// ENV
export const PORT = Number(Deno.env.get("PORT")) || undefined;
export const ENV = Deno.env.get("ENV");
export const API_BASE_URL = Deno.env.get("API_BASE_URL");
export const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
export const SECRET_JWT = Deno.env.get("SECRET_JWT");
export const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// CORS
export const CORS = cors({
  origin: ["http://localhost:4321"],
  allowMethods: ["POST", "GET", "PATCH", "DELETE"],
  maxAge: 600,
  credentials: true,
});
