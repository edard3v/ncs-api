import { z } from "zod";
import { name_zod } from "@/services/zod/name_zod.ts";
import { img_file_zod } from "@/services/zod/img_file_zod.ts";

export const update_author_dto = z
  .object({
    name: name_zod,
    img_file: img_file_zod,
  })
  .partial()
  .strict();

export type UpdateAuthorDto = z.infer<typeof update_author_dto>;
