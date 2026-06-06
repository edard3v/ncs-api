import { UpdateSongDto } from "@/modules/songs/update_song/update_song_dto.ts";
import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";
import { Cloudinary } from "@/services/cloudinary/cloudinary.ts";
import { SONGS_AUDIOS, SONGS_IMGS } from "@/services/cloudinary/paths_to_upload_cloudinary.ts";
import { CloudinaryErr } from "@/errors/CloudinaryErr.ts";
import { DtoErr } from "@/errors/DtoErr.ts";

export const update_song_service = async (song_id: UuidZod, params: UpdateSongDto) => {
  const { name, duration, img_file, song_file } = params;

  if (!name && !duration && !img_file && !song_file) throw new DtoErr();

  const select_song = await db.execute({
    sql: "select id, img_url, song_url from songs where id = ?",
    args: [song_id],
  });

  const song = select_song.rows[0];
  if (!song) throw new Record404();

  const old_img_url = song.img_url;
  const old_song_url = song.song_url;

  const sets: string[] = [];
  const args: (string | number)[] = [];
  let new_img_url = "";
  let new_song_url = "";

  const [p1, p2] = await Promise.allSettled([
    img_file && Cloudinary.upload(img_file, SONGS_IMGS),
    song_file && Cloudinary.upload(song_file, SONGS_AUDIOS),
  ]);

  try {
    if (p1.status === "fulfilled" && p1.value) {
      new_img_url = `${p1.value.url}?public_id=${p1.value.public_id}`;
    }

    if (p2.status === "fulfilled" && p2.value) {
      new_song_url = `${p2.value.url}?public_id=${p2.value.public_id}`;
    }

    if (p1.status === "rejected" || p2.status === "rejected") {
      throw new CloudinaryErr();
    }

    if (img_file) {
      sets.push("img_url = ?");
      args.push(new_img_url);
    }
    if (song_file) {
      sets.push("song_url = ?");
      args.push(new_song_url);
    }

    if (name) {
      sets.push("name = ?");
      args.push(name);
    }

    if (duration) {
      sets.push("duration = ?");
      args.push(duration);
    }

    args.push(song_id);
    const result = await db.execute({
      sql: `update songs set ${sets.join(", ")} where id = ?`,
      args,
    });

    Promise.all([
      new_img_url && old_img_url && Cloudinary.destroy(old_img_url as string, "image"),
      new_song_url && old_song_url && Cloudinary.destroy(old_song_url as string, "video"),
    ]).catch((e) =>
      console.log(
        "Fallo al borrar imagen o audio huérfana en Cloudinary",
        old_img_url,
        old_song_url,
        e,
      ),
    );

    return result.rowsAffected;
  } catch (error) {
    Promise.all([
      new_img_url && Cloudinary.destroy(new_img_url, "image"),
      new_song_url && Cloudinary.destroy(new_song_url, "video"),
    ]).catch((e) => console.log("Fallo al borrar imagen o audio huérfana en Cloudinary", e));

    throw error;
  }
};
