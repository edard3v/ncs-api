import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";

export const delete_author_service = async (author_id: UuidZod) => {
  const sql_author_to_remove = await db.execute({
    sql: "select img_url from authors where id = ?",
    args: [author_id],
  });

  const author = sql_author_to_remove.rows[0];

  if (!author) throw new Record404();

  const result = await db.execute({
    sql: "delete from authors where id = ?",
    args: [author_id],
  });

  if (author.img_url) {
    Cloudinary.destroy(author.img_url as string, "image").catch((err) => {
      console.error("Fallo al borrar imagen vieja en Cloudinary):", author.img_url, err);
    });
  }

  return result.rowsAffected;
};
