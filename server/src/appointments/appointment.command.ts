import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { AppointmentService } from './appointments.service';

@Injectable()
export class AppointmentCommand {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Command({
    command: 'GET:appointments',
    describe: 'get all appointments',
  })
  async getAllAppointments() {
      return await this.appointmentService.getAllAppointments();
  }
}
