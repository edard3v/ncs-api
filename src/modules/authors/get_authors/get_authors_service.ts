import { GetAuthorsDto } from "@/modules/authors/get_authors/get_authors_dto.ts";
import { db } from "@/db/db.ts";
import { PageErr } from "@/errors/PageErr.ts";
import { Record404 } from "@/errors/Record404.ts";

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

  const where_clause = conditions.length > 0 ? " where " + conditions.join(" and ") : "";

  const sql_count = `
  select
  count(*) as total
  from authors
  ${where_clause}
  `;

  const count_result = await db.execute({
    sql: sql_count,
    args,
  });

  const total_records = Number(count_result.rows[0].total);

  if (!total_records) throw new Record404();

  const total_pages = Math.ceil(total_records / limit) || 1;

  const sql = `
  select
  authors.id,
  authors.name,
  authors.img_url
  from authors
  ${where_clause}
  order by authors.name asc
  limit ?
  offset ?
  `;

  const result = await db.execute({
    sql,
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
