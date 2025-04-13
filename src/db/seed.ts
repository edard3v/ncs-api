import { db } from "./db.ts";
import { ACCOUNTS } from "./drafts/accounts.draft.ts";
import { AUTHORS } from "@db/drafts/authors.draft.ts";
import { accounts, authors } from "./schema.ts";

const seed = async () => {
  await db.delete(accounts).execute();
  await db.insert(accounts).values(ACCOUNTS);

  await db.delete(authors).execute();
  await db.insert(authors).values(AUTHORS);
};

seed().catch(console.error);
