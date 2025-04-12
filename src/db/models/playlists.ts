import { sql } from "drizzle-orm";
import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";
import { accounts } from "@db/models/accounts.ts";

export const playlists = pgTable("playlists", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).unique().notNull(),

  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),

  account_id: uuid()
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
});

export type InsertPlaylists = typeof playlists.$inferInsert;
export type SelectPlaylists = typeof playlists.$inferSelect;
