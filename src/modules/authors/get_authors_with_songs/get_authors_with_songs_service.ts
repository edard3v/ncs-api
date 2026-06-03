import { db } from "@/db/db.ts";
import { PageErr } from "@/errors/PageErr.ts";
import { GetAuthorsWithSongsDto } from "@/modules/authors/get_authors_with_songs/get_authors_with_songs_dto.ts";

export const get_authors_with_songs_service = async (params: GetAuthorsWithSongsDto) => {
  const { name, limit = 5, page = 1 } = params;

  if (!page) throw new PageErr();

  const conditions: string[] = [];
  const args: string[] = [];
  const offset = (page - 1) * limit;

  if (name) {
    conditions.push("authors.name like ?");
    args.push(`%${name}%`);
  }

  const where_clause = conditions.length > 0 ? " where " + conditions.join(" and ") : "";

  const sql_count = `
  select
  count(distinct authors.id) as total
  from authors inner join songs on authors.id = songs.author_id
  ${where_clause}
  `;

  const count_result = await db.execute({
    sql: sql_count,
    args,
  });

  const total_records = Number(count_result.rows[0].total);

  const total_pages = Math.ceil(total_records / limit) || 1;

  const sql = `
  select
  authors.id,
  authors.name,
  authors.img_url,
  json_group_array(
    json_object(
      'id', songs.id,
      'name', songs.name,
      'song_url', songs.song_url
    )
  ) as songs
  from authors inner join songs on authors.id = songs.author_id
  ${where_clause}
  group by authors.id
  order by authors.name asc
  limit ?
  offset ?
  `;

  const result = await db.execute({
    sql,
    args: [...args, limit, offset],
  });

  const formatted_records = result.rows.map((row) => ({
    ...row,
    songs: JSON.parse(row.songs as string),
  }));

  return {
    total_records,
    limit,
    total_pages,
    page,
    records: formatted_records,
  };
};
