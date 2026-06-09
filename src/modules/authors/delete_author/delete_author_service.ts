import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";

export const delete_author_service = async (id: UuidZod) => {
  const result = await db.execute({
    sql: "delete from authors where id = ? returning img_url",
    args: [id],
  });

  if (!result.rowsAffected) throw new Record404();

  const deleted_author = result.rows[0];

  if (result.rowsAffected) {
    Cloudinary.destroy(deleted_author.img_url as string, "image").catch((err) => {
      console.error("Fallo al borrar imagen vieja en Cloudinary):", deleted_author.img_url, err);
    });
  }

  return result.rowsAffected;
};
