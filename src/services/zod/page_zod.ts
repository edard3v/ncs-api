import { z } from "zod";

export const page_zod = z.coerce.number({ message: "Debería ser un número." }).min(1);
