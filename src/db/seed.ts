import { db } from "./db.ts";
import { ACCOUNTS } from "./drafts/accounts.draft.ts";
import { AUTHORS } from "@db/drafts/authors.draft.ts";
import { accounts, authors, songs } from "./schema.ts";
import { SONGS } from "@db/drafts/songs.draft.ts";

const seed = async () => {
  await db.delete(accounts).execute();
  await db.delete(songs).execute();
  await db.delete(authors).execute();

  await db.insert(accounts).values(ACCOUNTS);
  await db.insert(authors).values(AUTHORS);
  await db.insert(songs).values(SONGS);
};

seed().catch(console.error);
