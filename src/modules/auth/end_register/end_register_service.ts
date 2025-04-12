import { db } from "@db/db.ts";
import { StartRegisterDto } from "../start_register/start_register_dto.ts";
import { accounts } from "@db/schema.ts";

export const end_register_service = async (new_account: StartRegisterDto) => {
  await db.insert(accounts).values({ ...new_account });
};
