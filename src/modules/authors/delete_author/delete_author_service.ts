import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";

export const delete_author_service = async (id: UuidZod) => {
  const result = await db.execute({
    sql: "delete from authors where id = ?",
    args: [id],
  });

  if (!result.rowsAffected) throw new Record404();

  return result.rowsAffected;
};
