import { db } from "@db/db.ts";
import { songs } from "@db/schema.ts";
import { and, eq, like } from "drizzle-orm";
import { Record404 } from "@errors/Record404.ts";
import { PageErr } from "@errors/PageErr.ts";
import { ReadSongsDto } from "@modules/songs/read_songs/read_songs_dto.ts";

export const read_songs_service = async (params: ReadSongsDto) => {
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
    .select()
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
