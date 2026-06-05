import { UpdateSongDto } from "@/modules/songs/update_song/update_song_dto.ts";
import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";
import { SONGS_IMGS } from "@/services/cloudinary/paths_to_upload_cloudinary.ts";
import { DtoErr } from "@/errors/DtoErr.ts";

export const update_song_service = async (song_id: UuidZod, params: UpdateSongDto) => {
  const select_song = await db.execute({
    sql: "select id, song_url, img_url from song where id = ?",
    args: [song_id],
  });

  const song = select_song.rows[0];

  if (!song) throw new Record404();

  const { name, duration, img_file, song_file } = params;

  const sets: string[] = [];
  const args: (string | number)[] = [];
  let new_img_url = "";

  if (img_file) {
    const { url, public_id } = await Cloudinary.upload(img_file, SONGS_IMGS);
    new_img_url = `${url}?public_id=${public_id}`;

    sets.push("img_url = ?");
    args.push(new_img_url);
  }

  try {
    if (name) {
      sets.push("name = ?");
      args.push(name);
    }

    if (duration) {
      sets.push("duration = ?");
      args.push(duration);
    }

    if (sets.length === 0) throw new DtoErr(); // no es necesario, pero por las dudas lo dejo xD

    args.push(song_id);
    const result = await db.execute({
      sql: `update songs set ${sets.join(", ")} where id = ?`,
      args,
    });

    if (img_file && song.img_url) {
      const old_img_url = song.img_url as string;
      Cloudinary.destroy(old_img_url, "image").catch((err) => {
        console.error(`[Fondo] Fallo al borrar imagen vieja en Cloudinary (${old_img_url}):`, err);
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
