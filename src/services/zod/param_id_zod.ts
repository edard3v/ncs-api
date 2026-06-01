import z from "zod";
import { uuid_zod } from "@/services/zod/uuid_zod.ts";

export const param_id_zod = z.object({ id: uuid_zod });
