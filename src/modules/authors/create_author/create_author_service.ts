import { CreateAuthorDto } from "@/modules/authors/create_author/create_author_dto.ts";
import { db } from "@/db/db.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";
import { AUTHORS_IMGS } from "@/services/cloudinary/paths_to_upload_cloudinary.ts";

export const create_author_service = async (params: CreateAuthorDto) => {
  const { name, img_file } = params;

  const { url, public_id } = await Cloudinary.upload(img_file, AUTHORS_IMGS);
  const final_url = `${url}?public_id=${public_id}`;

  try {
    const result = await db.execute({
      sql: "insert into authors (id, name, img_url) values (?, ?, ?)",
      args: [crypto.randomUUID(), name, final_url],
    });

    return result.rowsAffected;
  } catch (error) {
    // No hay 'await', la API responde rápido.
    // El '.catch()' evita que un error de Cloudinary crashee Deno.
    Cloudinary.destroy(final_url, "image").catch((err) => {
      console.error(`[Fondo] Fallo al borrar imagen huérfana en Cloudinary (${final_url}):`, err);
    });

    throw error;
  }
};
