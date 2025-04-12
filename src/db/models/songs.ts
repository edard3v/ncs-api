import { sql } from "drizzle-orm";
import { bigint, integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { authors } from "@db/models/authors.ts";

export const songs = pgTable("songs", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  name: varchar({ length: 255 }).unique().notNull(),
  song_url: text().notNull(),
  duration: integer().notNull(), // representa el tiempo en segundos
  likes: bigint({ mode: "bigint" }).default(0n),
  img_url: text().notNull(),

  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  author_id: uuid()
    .notNull()
    .references(() => authors.id, { onDelete: "restrict" }),
});

export type InsertSongs = typeof songs.$inferInsert;
export type SelectSongs = typeof songs.$inferSelect;
