import { Encrypt } from "../../services/encrypt/encrypt.ts";
import { Role } from "../enums/Role.ts";

export const ACCOUNTS = [
  {
    id: "a1000000-0000-0000-0000-000000000000",
    email: Deno.env.get("ADMIN_EMAIL")!,
    password: Encrypt.hash(Deno.env.get("ADMIN_PASSWORD")!),
    role: Role.admin,
  },
];
