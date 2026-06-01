import { db } from "@/db/db.ts";
import { EndRegisterDto } from "./end_register_dto.ts";

export const end_register_service = async (params: EndRegisterDto) => {
  await db.execute({
    sql: "insert into accounts (id, email, password) values (?, ?, ?)",
    args: [crypto.randomUUID(), params.email, params.password],
  });
};
