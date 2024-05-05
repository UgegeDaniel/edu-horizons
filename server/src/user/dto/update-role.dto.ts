import { IsEnum } from "class-validator";
import { UserRoles } from "../utils/types";

export class UpdateRoleDto {
    @IsEnum(UserRoles, { message: "Invalid Role Passed "})
      role: UserRoles;
}