import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../utils/types";

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  role: UserRole;
}