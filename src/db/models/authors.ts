import { sql } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const authors = pgTable("authors", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  name: varchar({ length: 255 }).unique().notNull(),
  img_url: text().notNull(),

  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type InsertAuthors = typeof authors.$inferInsert;
export type SelectAuthors = typeof authors.$inferSelect;
