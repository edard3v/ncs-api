import { db } from "@/db/db.ts";
import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { Record404 } from "@/errors/Record404.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";

export const delete_song_service = async (song_id: UuidZod) => {
  const result = await db.execute({
    sql: "delete from songs where id = ? returning song_url, img_url",
    args: [song_id],
  });

  if (!result.rowsAffected) throw new Record404();

  const deleted_song = result.rows[0];

  const resources_to_be_eliminated = [];

  if (deleted_song.song_url) {
    resources_to_be_eliminated.push(
      Cloudinary.destroy(deleted_song.song_url as string, "video").catch((err) => {
        console.error("Fallo al borrar canción vieja en Cloudinary):", deleted_song.song_url, err);
      }),
    );
  }

  if (deleted_song.img_url) {
    resources_to_be_eliminated.push(
      Cloudinary.destroy(deleted_song.img_url as string, "image").catch((err) => {
        console.error("Fallo al borrar imagen vieja en Cloudinary):", deleted_song.img_url, err);
      }),
    );
  }

  Promise.all(resources_to_be_eliminated);

  return result.rowsAffected;
};
