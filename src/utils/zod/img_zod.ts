import { z } from "zod";

export const img_zod = z.string().url({ message: "Debería ser una url." }).or(z.literal(null));
