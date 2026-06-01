import { z } from "zod";

export const email_zod = z.string().email({ message: "ejemplo@gmail.com" });
