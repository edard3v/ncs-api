import z from "zod";
import { start_register_dto } from "@/modules/auth/start_register/start_register_dto.ts";

export const end_register_dto = start_register_dto;

export type EndRegisterDto = z.infer<typeof end_register_dto>;
