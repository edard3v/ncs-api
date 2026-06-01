import z from "zod";
import { email_zod } from "@/services/zod/email_zod.ts";
import { password_zod } from "@/services/zod/password_zod.ts";

export const login_dto = z
  .object({
    email: email_zod,
    password: password_zod,
  })
  .strict();

export type LoginDto = z.infer<typeof login_dto>;
