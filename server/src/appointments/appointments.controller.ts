import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IsStudentOrTutor, IsTutor } from 'src/auth/guards/role.guard';
import { Verified } from 'src/auth/guards/verified.guard';
import { AbilityFactory, Action } from 'src/ability/ability.factory/ability.factory';
import { Appointment } from './entities/appointment.entity';
import { ForbiddenError } from '@casl/ability';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly abilityFactory: AbilityFactory) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(Verified)
  async createAppointment(
    @Req() req,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    const ability = await this.abilityFactory.defineAbility(req.user.id);
    const isAllowed = ability.can(Action.Create, Appointment)
    if (!isAllowed) {
      throw new ForbiddenException("Only Tutors and Admins are allowed to create appointment")
    }
    //ALTERNATIVELY 
    // try {
    //   ForbiddenError
    //     .from(ability)
    //     .setMessage('Custom message')
    //     .throwUnlessCan(Action.Create, Appointment)
    //   return await this.appointmentService.createAppointment(
    //     req.user.id,
    //     createAppointmentDto,
    //   );
    // } catch (error) {
    //   if (error instanceof ForbiddenError) {
    //     throw new ForbiddenException(error.message);
    //   }
    // }
    return await this.appointmentService.createAppointment(
      req.user.id,
      createAppointmentDto,
    );
  }

  @Get('to-host')
  @UseGuards(JwtAuthGuard)
  @UseGuards(Verified)
  @UseGuards(IsTutor)
  appointmentsToHost(@Req() req) {
    return this.appointmentService.findAllUserAppointmentsToHost(req.user.id);
  }

  @Get('to-attend')
  @UseGuards(JwtAuthGuard)
  @UseGuards(Verified)
  @UseGuards(IsStudentOrTutor)
  appoointmentsToAttend(@Req() req) {
    return this.appointmentService.findAllUserAppointmentsToAttend(req.user.id);
  }

  @Patch('update-appointment/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(Verified)
  @UseGuards(IsTutor)
  updateAppointmentDetails(
    @Req() req,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
    @Param('id') appointmentId: string,
  ) {
    return this.appointmentService.updateAppointmentDetails(
      req.user.id,
      Number(appointmentId),
      updateAppointmentDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(Verified)
  @UseGuards(IsTutor)
  remove(@Param('id') appointmentId: string, @Req() req) {
    return this.appointmentService.cancelAppointment(
      req.user.id,
      +appointmentId,
    );
  }
}
