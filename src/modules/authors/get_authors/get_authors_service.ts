import { GetAuthorsDto } from "@/modules/authors/get_authors/get_authors_dto.ts";
import { db } from "@/db/db.ts";

export const get_authors_service = async (params: GetAuthorsDto) => {
  const { name, limit = 5, page = 1 } = params;

  const conditions: string[] = [];
  const args: string[] = [];
  const offset = (page - 1) * limit;

  if (name) {
    conditions.push("name like ?");
    args.push(`%${name}%`);
  }

  const where_clause = conditions.length > 0 ? " where " + conditions.join(" and ") : "";

  const count_sql = `select count(*) as total from authors${where_clause}`;
  const count_result = await db.execute({
    sql: count_sql,
    args,
  });

  const total_records = Number(count_result.rows[0].total);
  const total_pages = Math.ceil(total_records / limit);

  const sql = `select id, name, img_url from authors${where_clause} limit ? offset ?`;

  const result = await db.execute({
    sql,
    args: [...args, limit, offset],
  });

  return {
    total_records,
    total_pages,
    limit,
    page,
    records: result.rows,
  };
};
