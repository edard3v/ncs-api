import { db } from "@db/db.ts";
import { songs } from "@db/schema.ts";
import { UUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { Cloudinary } from "@services/clodinary/cloudinary.ts";
import { Record404 } from "@errors/Record404.ts";
import { CloudinaryErr } from "@errors/CloudinaryErr.ts";

export const delete_song_service = async (song_id: UUID) => {
  await db.transaction(async (tx) => {
    const [song] = await tx.delete(songs).where(eq(songs.id, song_id)).returning();
    if (!song) throw new Record404();

    try {
      await Promise.all(
        [
          song.img_url && Cloudinary.destroy(song.img_url, "image"),
          song.song_url && Cloudinary.destroy(song.song_url, "video"),
        ].filter(Boolean)
      );
    } catch {
      throw new CloudinaryErr();
    }
  });
};
