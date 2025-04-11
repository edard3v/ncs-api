import { db } from "./db.ts";
import { ACCOUNTS } from "./drafts/accounts.draft.ts";
import { accounts } from "./schema.ts";

const seed = async () => {
  await db.delete(accounts).execute();
  await db.insert(accounts).values(ACCOUNTS);
};

seed().catch(console.error);
