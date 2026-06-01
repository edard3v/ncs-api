import z from "zod";
import { email_zod } from "@/services/zod/email_zod.ts";
import { password_zod } from "@/services/zod/password_zod.ts";

export const start_register_dto = z
  .object({
    email: email_zod,
    password: password_zod,
  })
  .strict();

export type StartRegisterDto = z.infer<typeof start_register_dto>;
