import { z } from "zod";

export const uuid_zod = z.string().length(36, { message: "Debería ser un uuid." });
