import { cors } from "hono/cors";

// ENV
export const PORT = Number(Deno.env.get("PORT")) || undefined;
export const ENV = Deno.env.get("ENV");
export const API_BASE_URL = Deno.env.get("API_BASE_URL");
export const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL");
export const SECRET_JWT = Deno.env.get("SECRET_JWT");
export const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
export const CLOUDINARY_CLOUD_NAME = Deno.env.get("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = Deno.env.get("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = Deno.env.get("CLOUDINARY_API_SECRET");

// CORS
export const CORS = cors({
  origin: ["http://localhost:4321"],
  allowMethods: ["POST", "GET", "PATCH", "DELETE"],
  maxAge: 600,
  credentials: true,
});
