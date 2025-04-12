import { Encrypt } from "@services/encrypt/encrypt.ts";
import { send_mail_to_verify_register } from "./send_mail_to_verify_register.ts";
import { StartRegisterDto } from "./start_register_dto.ts";
import { Jwt } from "@services/tokens/jwt.ts";
import { db } from "@db/db.ts";
import { EmailErr } from "@errors/EmailErr.ts";

export const start_register_service = async (credentials: StartRegisterDto) => {
  await check_email(credentials.email);

  const new_account = { ...credentials };
  new_account.password = Encrypt.hash(new_account.password);

  const token = Jwt.sign(new_account, {
    expiresIn: "20m",
  });

  const link = `${Deno.env.get("API_BASE_URL")}/end_register/${token}`;
  await send_mail_to_verify_register(new_account.email, link);
};

const check_email = async (email: string) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.email, email),
  });
  if (account) throw new EmailErr();
};
