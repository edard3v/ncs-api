import { z } from "zod";
import { Country } from "../../db/enums/Country.ts";

export const country_zod = z.nativeEnum(Country);
