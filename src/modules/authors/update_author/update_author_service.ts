import { UpdateAuthorDto } from "@/modules/authors/update_author/update_author_dto.ts";
import { DtoErr } from "@/errors/DtoErr.ts";
import { db } from "@/db/db.ts";
import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";
import { AUTHORS_IMGS } from "@/services/cloudinary/paths_to_upload_cloudinary.ts";
import { Record404 } from "@/errors/Record404.ts";

export const update_author_service = async (author_id: UuidZod, params: UpdateAuthorDto) => {
  const { name, img_file } = params;
  if (!name && !img_file) throw new DtoErr();

  const select_author = await db.execute({
    sql: "select id, img_url from authors where id = ?",
    args: [author_id],
  });

  if (!select_author.rows.length) throw new Record404();

  const author = select_author.rows[0];
  const old_img_url = author.img_url;

  const sets: string[] = [];
  const args: string[] = [];
  let new_img_url = "";

  if (img_file) {
    const { url, public_id } = await Cloudinary.upload(img_file, AUTHORS_IMGS);
    new_img_url = `${url}?public_id=${public_id}`;

    sets.push("img_url = ?");
    args.push(new_img_url);
  }

  try {
    if (name) {
      sets.push("name = ?");
      args.push(name);
    }

    if (sets.length === 0) throw new DtoErr(); // no es necesario, pero por las dudas lo dejo xD

    args.push(author_id);
    const result = await db.execute({
      sql: `update authors set ${sets.join(", ")} where id = ?`,
      args,
    });

    if (new_img_url && old_img_url) {
      Cloudinary.destroy(old_img_url as string, "image").catch((err) => {
        console.error("Fallo al borrar imagen vieja en Cloudinary):", old_img_url, err);
      });
    }

    return result.rowsAffected;
  } catch (error) {
    if (new_img_url) {
      Cloudinary.destroy(new_img_url, "image").catch((err) => {
        console.error(
          `[Fondo] Fallo al borrar imagen huérfana en Cloudinary (${new_img_url}):`,
          err,
        );
      });
    }

    throw error;
  }
};
