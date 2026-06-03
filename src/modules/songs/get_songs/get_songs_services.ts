import { GetSongsDto } from "@/modules/songs/get_songs/get_songs_dto.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";

export const get_songs_service = async (params: GetSongsDto) => {
  const { name, author_id, page = 1, limit = 5 } = params;

  const conditions: string[] = [];
  const args: string[] = [];
  const offset = (page - 1) * limit;

  if (name) {
    conditions.push("songs.name like ?");
    args.push(`%${name}%`);
  }

  if (author_id) {
    conditions.push("songs.author_id = ?");
    args.push(author_id);
  }

  const where_clause = conditions.length > 0 ? `where ${conditions.join(" and ")}` : "";

  const sql_count = await db.execute({
    sql: `select count(*) as total from songs ${where_clause}`,
    args,
  });

  const total_records = Number(sql_count.rows[0].total);

  if (!total_records) throw new Record404();

  const total_pages = Math.ceil(total_records / limit) || 1;

  const result = await db.execute({
    sql: `
      select
        id,
        name,
        song_url,
        img_url,
        duration,
        likes,
        author_id
      from songs
      ${where_clause}
      limit ?
      offset ?
    `,
    args: [...args, limit, offset],
  });

  return {
    total_records,
    limit,
    total_pages,
    page,
    records: result.rows,
  };
};
