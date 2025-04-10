import { sql } from "drizzle-orm";
import { pgTable, text, integer, uuid, boolean } from "drizzle-orm/pg-core";
import { Role } from "../enums/Role.ts";

export const accounts = pgTable("accounts", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  role: text({ enum: [Role.admin, Role.client, Role.seller] }).default(Role.client),
  email: text().unique().notNull(),
  name: text(),
  tel: integer(),
  country: text(), // recuerda validar con el enum Country
  img: text(),
  password: text().notNull(),
  is_active: boolean().notNull().default(true),

  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  updated_at: text().$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type InsertAccounts = typeof accounts.$inferInsert;
export type SelectAccounts = typeof accounts.$inferSelect;
