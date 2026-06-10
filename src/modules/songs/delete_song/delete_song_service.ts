import { db } from "@/db/db.ts";
import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { Record404 } from "@/errors/Record404.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";

export const delete_song_service = async (song_id: UuidZod) => {
  const sql_song_to_remove = await db.execute({
    sql: "select song_url, img_url from songs where id = ?",
    args: [song_id],
  });

  const song = sql_song_to_remove.rows[0];

  if (!song) throw new Record404();

  const result = await db.execute({
    sql: "delete from songs where id = ?",
    args: [song_id],
  });

  const resources_to_be_eliminated = [];

  if (song.song_url) {
    resources_to_be_eliminated.push(
      Cloudinary.destroy(song.song_url as string, "video").catch((err) => {
        console.error("Fallo al borrar canción vieja en Cloudinary):", song.song_url, err);
      }),
    );
  }

  if (song.img_url) {
    resources_to_be_eliminated.push(
      Cloudinary.destroy(song.img_url as string, "image").catch((err) => {
        console.error("Fallo al borrar imagen vieja en Cloudinary):", song.img_url, err);
      }),
    );
  }

  void Promise.allSettled(resources_to_be_eliminated);

  return result.rowsAffected;
};
