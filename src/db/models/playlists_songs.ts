import { sql } from "drizzle-orm";
import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { playlists } from "@db/models/playlists.ts";
import { songs } from "@db/models/songs.ts";

export const playlists_songs = pgTable(
  "playlists_songs",
  {
    playlist_id: uuid()
      .notNull()
      .references(() => playlists.id, { onDelete: "cascade" }),

    song_id: uuid()
      .notNull()
      .references(() => songs.id, { onDelete: "cascade" }),

    created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
    updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  },
  (t) => [primaryKey({ columns: [t.playlist_id, t.song_id] })]
);

export type InsertPlaylistsSongs = typeof playlists_songs.$inferInsert;
export type SelectPlaylistsSongs = typeof playlists_songs.$inferSelect;
