import { sql } from "drizzle-orm";
import { pgTable, text, uuid, boolean, varchar } from "drizzle-orm/pg-core";
import { Role } from "../enums/Role.ts";

export const accounts = pgTable("accounts", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  role: varchar({ enum: [Role.admin, Role.client, Role.seller], length: 255 }).default(Role.client),
  email: varchar({ length: 255 }).unique().notNull(),
  is_active: boolean().notNull().default(true),
  img_url: text(),
  password: varchar({ length: 255 }).notNull(),

  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type InsertAccounts = typeof accounts.$inferInsert;
export type SelectAccounts = typeof accounts.$inferSelect;
