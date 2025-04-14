import { db } from "@db/db.ts";
import { songs } from "@db/schema.ts";
import { and, eq, like } from "drizzle-orm";
import { Record404 } from "@errors/Record404.ts";
import { PageErr } from "@errors/PageErr.ts";
import { GetSongsDto } from "@modules/songs/get_songs/get_songs_dto.ts";

export const get_songs_service = async (params: GetSongsDto) => {
  const { name, author_id, page = 1, limit = 10 } = params;

  const where = [
    name ? like(songs.name, `%${name}%`) : undefined,
    author_id ? eq(songs.author_id, author_id) : undefined,
  ].filter(Boolean);

  const total_records = (
    await db
      .select({ id: songs.id })
      .from(songs)
      .where(and(...where))
  ).length;

  if (!total_records) throw new Record404();

  const total_pages = Math.ceil(total_records / limit) || 1;
  if (page > total_pages) throw new PageErr();

  const records = await db
    .select({
      id: songs.id,
      name: songs.name,
      duration: songs.duration,
      img_url: songs.img_url,
      song_url: songs.song_url,
      likes: songs.likes,
    })
    .from(songs)
    .where(and(...where))
    .limit(limit)
    .offset((page - 1) * limit);

  return {
    limit,
    page,
    total_pages,
    records,
  };
};
