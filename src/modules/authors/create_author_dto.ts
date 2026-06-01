import { z } from "zod";
import { name_zod } from "@/services/zod/name_zod.ts";
import { img_file_zod } from "@/services/zod/img_file_zod.ts";

export const create_author_dto = z
  .object({
    name: name_zod,
    img_file: img_file_zod,
  })
  .strict();

export type CreateAuthorDto = z.infer<typeof create_author_dto>;
