import { GetSongsDto } from "@/modules/songs/get_songs/get_songs_dto.ts";
import { db } from "@/db/db.ts";

export const get_songs_with_author_service = async (params: GetSongsDto) => {
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

  const [sql_count, result] = await Promise.all([
    db.execute({
      sql: `select count(*) as total from songs ${where_clause}`,
      args,
    }),
    db.execute({
      sql: `
      select
        songs.id,
        songs.name,
        songs.song_url,
        songs.img_url,
        songs.duration,
        songs.likes
      from songs
      inner join authors on songs.author_id = authors.id
      ${where_clause}
      limit ?
      offset ?
    `,
      args: [...args, limit, offset],
    }),
  ]);

  const total_records = Number(sql_count.rows[0].total);

  const total_pages = Math.ceil(total_records / limit) || 1;

  return {
    total_records,
    limit,
    total_pages,
    page,
    records: result.rows,
  };
};
