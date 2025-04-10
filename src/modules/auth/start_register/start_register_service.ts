import { db } from "../../../db/db.ts";
import { EmailErr } from "../../../errors/EmailErr.ts";
import { Encrypt } from "../../../services/encrypt/encrypt.ts";
import { JWT } from "../../../services/tokens/jwt.ts";
import { send_mail_to_verify_register } from "./send_mail_to_verify_register.ts";
import { StartRegisterDto } from "./start_register_dto.ts";

export const start_register_service = async (credentials: StartRegisterDto) => {
  await checkEmail(credentials.email);

  const newAccount = { ...credentials };
  newAccount.password = Encrypt.hash(newAccount.password);

  const token = JWT.sign(newAccount, {
    expiresIn: "20m",
  });

  const link = `${Deno.env.get("API_BASE_URL")}/end_register/${token}`;
  await send_mail_to_verify_register(newAccount.email, link);
};

const checkEmail = async (email: string) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.email, email),
  });
  if (account) throw new EmailErr();
};
