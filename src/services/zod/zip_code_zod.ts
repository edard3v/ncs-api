import { z } from "zod";

export const zip_code_zod = z.number().int().nonnegative();
