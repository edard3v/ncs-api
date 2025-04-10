import { z } from "zod";
import { Role } from "../../db/enums/Role.ts";

export const role_zod = z.nativeEnum(Role);
