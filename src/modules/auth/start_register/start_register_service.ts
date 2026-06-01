import { send_mail_to_verify_register } from "./send_mail_to_verify_register.ts";
import { StartRegisterDto } from "./start_register_dto.ts";
import { Jwt } from "@/services/tokens/jwt.ts";
import { Encrypt } from "@/services/encrypt/encrypt.ts";
import { db } from "@/db/db.ts";
import { EmailErr } from "@/errors/EmailErr.ts";
import { API_BASE_URL } from "@/app/config.ts";

export const start_register_service = async (credentials: StartRegisterDto) => {
  await check_email(credentials.email);

  const new_account = { ...credentials };
  new_account.password = Encrypt.hash(new_account.password);

  const token = Jwt.sign(new_account, {
    expiresIn: "20m",
  });

  const link = `${API_BASE_URL}/end_register/${token}`;
  await send_mail_to_verify_register(credentials.email, link);
};

const check_email = async (email: string) => {
  const sql = await db.execute({
    sql: "select id from accounts where email = ?",
    args: [email],
  });

  if (sql.rows.length) throw new EmailErr();
};
