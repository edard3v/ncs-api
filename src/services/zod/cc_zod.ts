import { z } from "zod";

export const cc_zod = z.number().int().nonnegative();
