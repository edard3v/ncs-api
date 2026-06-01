import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";

export const get_author_by_id_service = async (author_id: UuidZod) => {
  const result = await db.execute({
    sql: "select * from authors where id = ?",
    args: [author_id],
  });

  if (!result.rows.length) throw new Record404();

  return result.rows[0];
};
