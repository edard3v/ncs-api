import pg from "pg";
import { drizzle as drizzle_remote } from "drizzle-orm/neon-http";
import { drizzle as drizzle_local } from "drizzle-orm/node-postgres";
import { neon } from "@neondatabase/serverless";
import { DATABASE_URL } from "../../drizzle.config.ts";
import { IS_PRODUCTION } from "../app/config.ts";
import * as schema from "./schema.ts";
// import * as relations from "./relations.ts";

const sql_local = new pg.Pool({ connectionString: DATABASE_URL });
const sql_remote = neon(DATABASE_URL);
const config = { schema: { ...schema } };

export const db = !IS_PRODUCTION
  ? drizzle_local(sql_local, config)
  : drizzle_remote(sql_remote, config);
