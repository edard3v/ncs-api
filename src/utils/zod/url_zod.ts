import { z } from "zod";

export const url_zod = z.string().url();
