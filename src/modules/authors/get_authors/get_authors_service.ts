import { GetAuthorsDto } from "@/modules/authors/get_authors/get_authors_dto.ts";
import { db } from "@/db/db.ts";
import { PageErr } from "@/errors/PageErr.ts";

export const get_authors_service = async (params: GetAuthorsDto) => {
  const { name, limit = 5, page = 1 } = params;

  if (!page) throw new PageErr();

  const conditions: string[] = [];
  const args: string[] = [];
  const offset = (page - 1) * limit;

  if (name) {
    conditions.push("authors.name like ?");
    args.push(`%${name}%`);
  }

  const where_clause = conditions.length > 0 ? `where ${conditions.join(" and ")}` : "";

  const [sql_count, result] = await Promise.all([
    db.execute({
      sql: `select count(*) as total from authors ${where_clause}`,
      args,
    }),

    db.execute({
      sql: `
      select
        authors.id,
        authors.name,
        authors.img_url
      from authors
      ${where_clause}
      order by authors.name asc
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
