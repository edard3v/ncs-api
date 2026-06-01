import { z } from "zod";

export const dir_zod = z.string().min(1).max(255);
