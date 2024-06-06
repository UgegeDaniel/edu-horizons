import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InferSubjects } from 'nest-casl';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserRole } from 'src/user/utils/types';

export enum Action {
  Manage = 'manage', // Wildcard for any action
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  InferSubjects<typeof User> |
  InferSubjects<typeof Appointment> |
  'all';

export type AppAbility = Ability<[Action, Subjects]>;
@Injectable()
export class AbilityFactory {
  constructor(private readonly userService: UserService){
    
  }
  async defineAbility(userId: number) {
    const user = await this.userService.findById(userId);
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
      );
      if (user.role === "ADMIN") {
          can(Action.Manage, User);
      }
      if (user.role === "STUDENT") {
          cannot(Action.Create, Appointment);
      }

      return build({
          detectSubjectType: (item) => {
              return item.constructor as ExtractSubjectType<Subjects>;
          }
      })
  }
}
