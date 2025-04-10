import { JwtPayload } from "jsonwebtoken";
import { db } from "../../../db/db.ts";
import { LoginErr } from "../../../errors/LoginErr.ts";
import { Encrypt } from "../../../services/encrypt/encrypt.ts";
import { JWT } from "../../../services/tokens/jwt.ts";
import { LoginDto } from "./login_dto.ts";
import { UUID } from "node:crypto";
import { Role } from "../../../db/enums/Role.ts";

export const login_service = async (login: LoginDto) => {
  const account = await db.query.accounts.findFirst({
    where: (account, { eq }) => eq(account.email, login.email),
  });
  if (!account) throw new LoginErr();

  const isLogged = Encrypt.compare(login.password, account.password);
  if (!isLogged) throw new LoginErr();

  const token = JWT.sign({
    id: account.id,
    role: account.role,
    img: account.img,
    name: account.name,
    email: account.email,
  });

  return token;
};

export interface TokenPayload extends JwtPayload {
  id: UUID;
  role: Role;
  name: string;
  img: string;
  email: string;
}
