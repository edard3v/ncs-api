import { Encrypt } from "@services/encrypt/encrypt.ts";
import { Role } from "@db/enums/Role.ts";
import { InsertAccounts } from "@db/models/accounts.ts";

export const ACCOUNTS: InsertAccounts[] = [
  {
    id: "b5bcb3ae-8f25-4f8e-ae4f-166ce7c997b2",
    email: Deno.env.get("ADMIN_EMAIL")!,
    password: Encrypt.hash(Deno.env.get("ADMIN_PASSWORD")!),
    role: Role.admin,
  },
];
