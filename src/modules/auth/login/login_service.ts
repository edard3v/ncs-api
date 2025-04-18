import { JwtPayload } from "jsonwebtoken";
import { LoginDto } from "./login_dto.ts";
import { UUID } from "node:crypto";
import { db } from "@db/db.ts";
import { LoginErr } from "@errors/LoginErr.ts";
import { Encrypt } from "@services/encrypt/encrypt.ts";
import { Jwt } from "@services/tokens/jwt.ts";
import { Role } from "@db/enums/Role.ts";

export const login_service = async (login: LoginDto) => {
  const account = await db.query.accounts.findFirst({
    where: (account, { eq }) => eq(account.email, login.email),
  });
  if (!account) throw new LoginErr();

  const isLogged = Encrypt.compare(login.password, account.password);
  if (!isLogged) throw new LoginErr();

  const token = Jwt.sign({
    id: account.id,
    role: account.role,
    img_url: account.img_url,
    email: account.email,
  });

  return token;
};

export interface TokenPayload extends JwtPayload {
  id: UUID;
  role: Role;
  name: string;
  img_url: string;
  email: string;
}
