import { CreateSongDto } from "@/modules/songs/create_song/create_song_dto.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";
import { CloudinaryErr } from "@/errors/CloudinaryErr.ts";
import { SONGS_AUDIOS, SONGS_IMGS } from "@/services/cloudinary/paths_to_upload_cloudinary.ts";
import { db } from "@/db/db.ts";

export const create_song_service = async (params: CreateSongDto) => {
  const { duration, name, img_file, song_file, author_id } = params;

  let img_url = "";
  let song_url = "";

  try {
    const [p1, p2] = await Promise.allSettled([
      Cloudinary.upload(img_file, SONGS_IMGS),
      Cloudinary.upload(song_file, SONGS_AUDIOS),
    ]);

    if (p1.status === "fulfilled") {
      img_url = `${p1.value.url}?public_id=${p1.value.public_id}`;
    }
    if (p2.status === "fulfilled") {
      song_url = `${p2.value.url}?public_id=${p2.value.public_id}`;
    }

    if (p1.status === "rejected" || p2.status === "rejected") {
      throw new CloudinaryErr();
    }

    const result = await db.execute({
      sql: `
      insert into songs
      (id, name, song_url, img_url, duration, author_id)
      values (?, ?, ?, ?, ?, ?)
      `,
      args: [crypto.randomUUID(), name, song_url, img_url, duration, author_id],
    });

    return result.rowsAffected;
  } catch (error) {
    Promise.all([
      img_url && Cloudinary.destroy(img_url, "image"),
      song_url && Cloudinary.destroy(song_url, "video"),
    ]).catch((e) => console.log("Fallo al borrar imagen huérfana en Cloudinary", e));

    throw error;
  }
};
