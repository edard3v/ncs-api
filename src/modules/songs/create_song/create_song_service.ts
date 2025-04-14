import { db } from "@db/db.ts";
import { songs } from "@db/schema.ts";
import { CreateSongDto } from "@modules/songs/create_song/create_song_dto.ts";
import { Cloudinary } from "@services/clodinary/cloudinary.ts";
import { CloudinaryErr } from "@errors/CloudinaryErr.ts";

export const create_song_service = async (params: CreateSongDto) => {
  const { duration, name, img_file, song_file, author_id } = params;

  let img_url = "";
  let song_url = "";

  try {
    const [p1, p2] = await Promise.allSettled([
      Cloudinary.upload(img_file, "ncs/imgs"),
      Cloudinary.upload(song_file, "ncs/songs"),
    ]);

    if (p1.status === "rejected" || p2.status === "rejected") {
      throw new CloudinaryErr();
    }

    img_url = p1.value.public_id;
    song_url = p2.value.public_id;

    await db
      .insert(songs)
      .values({ duration, name: name.toLocaleLowerCase(), img_url, song_url, author_id });
  } catch (error) {
    await Promise.allSettled([
      img_url && Cloudinary.destroy(img_url, "image"),
      song_url && Cloudinary.destroy(song_url, "raw"),
    ]);

    throw error;
  }
};
