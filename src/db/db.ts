import pg from "pg";
import { drizzle as drizzle_remote } from "drizzle-orm/neon-http";
import { drizzle as drizzle_local } from "drizzle-orm/node-postgres";
import { DATABASE_URL } from "../../drizzle.config.ts";
import { IS_PRODUCTION } from "../app/config.ts";
import * as schema from "./schema.ts";
// import * as relations from "./relations.ts";

const config = { schema: { ...schema } };
const pg_pool = new pg.Pool({ connectionString: DATABASE_URL });

export const db = !IS_PRODUCTION
  ? drizzle_local(pg_pool, config)
  : drizzle_remote(DATABASE_URL, config);
