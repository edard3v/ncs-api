import { z } from "zod";

export const price_zod = z.number().nonnegative();
