import { UuidZod } from "@/services/zod/uuid_zod.ts";
import { db } from "@/db/db.ts";
import { Record404 } from "@/errors/Record404.ts";

export const get_song_by_id_service = async (song_id: UuidZod) => {
  const result = await db.execute({
    sql: `
    select 
      songs.id,
      songs.name,
      songs.song_url,
      songs.img_url,
      songs.created_at,
      songs.updated_at,
      json_object(
        'id', authors.id,
        'name', authors.name,
        'img_url', authors.img_url
      ) as author
    from songs
    inner join authors on songs.author_id = authors.id
    where songs.id = ?
    `,
    args: [song_id],
  });

  if (!result.rows.length) throw new Record404();

  const song = result.rows[0];

  return {
    ...song,
    author: JSON.parse(song.author as string),
  };
};
