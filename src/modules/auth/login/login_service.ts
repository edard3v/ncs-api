import { JwtPayload } from "jsonwebtoken";
import { LoginDto } from "@/modules/auth/login/login_dto.ts";
import { db } from "@/db/db.ts";
import { LoginErr } from "@/errors/LoginErr.ts";
import { Encrypt } from "@/services/encrypt/encrypt.ts";
import { Jwt } from "@/services/tokens/jwt.ts";
import { UUID } from "node:crypto";
import { Role } from "@/enums/Role.ts";

export const login_service = async (login: LoginDto) => {
  const sql = await db.execute({
    sql: "select id, email, password, role from accounts where email = ?",
    args: [login.email],
  });

  if (!sql.rows.length) throw new LoginErr();

  const account = sql.rows[0] as unknown as {
    id: UUID;
    email: string;
    password: string;
    role: Role;
  };

  if (!account.password) throw new LoginErr();

  const is_logged = Encrypt.compare(login.password, account.password);
  if (!is_logged) throw new LoginErr();

  const token = Jwt.sign({
    id: account.id,
    role: account.role,
    email: account.email,
  });

  return token;
};

export type TokenPayload = JwtPayload & {
  id: UUID;
  role: Role;
  email: string;
};
