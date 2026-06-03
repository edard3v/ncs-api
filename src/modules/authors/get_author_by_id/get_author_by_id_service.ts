import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";

export const get_author_by_id_service = async (author_id: UuidZod) => {
  const result = await db.execute({
    sql: `
    select 
      authors.id,
      authors.name,
      authors.img_url,
      authors.created_at,
      authors.updated_at,
      json_group_array(
        json_object(
          'id', songs.id,
          'name', songs.name,
          'song_url', songs.song_url
        )
      )
      filter (where songs.id is not null) as songs
    from authors
    left join songs on authors.id = songs.author_id
    where authors.id = ?
    group by authors.id
    `,
    args: [author_id],
  });

  if (!result.rows.length) throw new Record404();

  const author = result.rows[0];

  return {
    ...author,
    songs: JSON.parse(author.songs as string),
  };
};
