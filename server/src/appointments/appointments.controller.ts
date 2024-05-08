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
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentService } from './appointments.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Verified } from 'src/auth/guards/verified.guard';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  // @UseGuards(Verified)
  //tutor guard
  createAppointment(
    @Req() req,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentService.createAppointment(
      req.user.id,
      createAppointmentDto,
    );
  }

  @Get('to-host')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(Verified)
  appointmentsToHost(@Req() req) {
    return this.appointmentService.findAllUserAppointmentsToHost(req.user.id);
  }

  @Get('to-attend')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(Verified)
  appoointmentsToAttend(@Req() req) {
    return this.appointmentService.findAllUserAppointmentsToAttend(req.user.id);
  }

  @Patch('update-appointment/:id')
  @UseGuards(JwtAuthGuard)
  // @UseGuards(Verified)
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
  // @UseGuards(Verified)
  //tutor guard
  remove(@Param('id') appointmentId: string, @Req() req) {
    return this.appointmentService.remove(req.user.id, +appointmentId);
  }
}
