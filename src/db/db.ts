import { Config, createClient } from "@libsql/client";
import { ENV } from "@/app/config.ts";

const local_config = {
  url: "file:/home/edar/databases/ncs/ncs.db",
};

const production_config = {
  url: Deno.env.get("DB_URL") || "",
  authToken: Deno.env.get("DB_TOKEN"),
};

const db_config: Config = ENV == "local" ? local_config : production_config;

export const db = createClient(db_config);
