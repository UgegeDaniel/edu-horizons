import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly userService: UserService,
  ) {}
  private validateDateString(dateString: string) {
    const pattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
    const validDateString = pattern.test(dateString);
    if (validDateString) {
      return true;
    }
    throw new ForbiddenException(
      'Invalid date string. Allowed format: yyyy-mm-ddThh:mm:ss',
    );
  }
  private mapAttendees(attendees) {
    return attendees.map((attendee) => {
      const {
        id,
        createdAt,
        updatedAt,
        verified_email,
        strategy,
        password,
        role,
        ...rest
      } = attendee;
      return { ...rest };
    });
  }
  private async mapAppointments(appointments) {
    const mappedAppointments = Promise.all(
      appointments.map(async (appointment) => {
        const { createdAt, updatedAt, attendees, hostId, ...rest } =
          appointment;
        const mappedAttendees = this.mapAttendees(attendees);
        const {
          email: hostEmail,
          given_name: hostGivenName,
          family_name: hostFamilyName,
        } = await this.userService.findById(hostId);
        return {
          attendees: mappedAttendees,
          host: { hostEmail, hostGivenName, hostFamilyName },
          ...rest,
        };
      }),
    );
    return mappedAppointments;
  }

  async createAppointment(
    hostId: number,
    createAppointmentDto: CreateAppointmentDto,
  ) {
    const appointment = this.appointmentRepository.create();
    this.validateDateString(createAppointmentDto.appointment_time);
    const attendeesPromises = createAppointmentDto.attendeeIds.map(
      async (attendeeId) => {
        const attendee = await this.userService.findById(attendeeId);
        return attendee;
      },
    );
    const attendees = await Promise.all(attendeesPromises);
    const appointmentDetails = Object.assign(appointment, {
      ...createAppointmentDto,
      host: await this.userService.findById(hostId),
      attendees: this.mapAttendees(attendees),
    });
    const {
      attendeeIds,
      createdAt,
      updatedAt,
      host: {
        email: hostEmail,
        given_name: hostGivenName,
        family_name: hostFamilyName,
      },
      ...rest
    } = await this.appointmentRepository.save(appointmentDetails);
    return {
      ...rest,
      host: { hostEmail, hostGivenName, hostFamilyName },
    };
  }

  async findAllUserAppointmentsToHost(userId: number) {
    const appointments = await this.appointmentRepository.find({
      where: {
        host: { id: userId },
      },
      relations: ['attendees'],
    });
    return await this.mapAppointments(appointments);
  }

  async findAllUserAppointmentsToAttend(userId: number) {
    const queryBuilder =
      this.appointmentRepository.createQueryBuilder('appointment');
    queryBuilder.innerJoinAndSelect(
      'appointment.attendees',
      'user',
      'user.id = :userId',
      { userId },
    );
    return await this.mapAppointments(await queryBuilder.getMany());
  }

  async updateAppointmentDetails(
    userId: number,
    appointmentId: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const appointmentToUpdate = await this.appointmentRepository.findOne({
      where: {
        id: appointmentId,
      },
      relations: ['host'],
    });
    if (appointmentToUpdate.host.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to update this appointment',
      );
    }
    if (!appointmentToUpdate) {
      throw new NotFoundException('Appoointment not found');
    }
    Object.assign(appointmentToUpdate, updateAppointmentDto);
    await this.appointmentRepository.save(appointmentToUpdate);
    return { message: 'Appointment Updated Successfully' };
  }

  async getAppointmentById(id: number) {
    return await this.appointmentRepository.findOne({
      where: { id },
    });
  }

  async getAllAppointments() {
    return await this.appointmentRepository.find();
  }
  async searchAppointmentsByDate(
    startDate: Date,
    endDate: Date,
  ): Promise<Appointment[]> {
    const queryBuilder =
      this.appointmentRepository.createQueryBuilder('appointment');
    const appointmentsWithinRange = await queryBuilder
      .where('appointment.appointment_time BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getMany();

    return appointmentsWithinRange;
  }
  async cancelAppointment(userId: number, appointmentId: number) {
    const appointmentToDelete = await this.appointmentRepository.findOne({
      where: { id: appointmentId },
    });
    if (appointmentToDelete.host.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this appointment',
      );
    }
    if (!appointmentToDelete) {
      throw new NotFoundException('Appoointment not found');
    }
    await this.appointmentRepository.remove(appointmentToDelete);
    return { message: 'Appointment Deleted Successfully' };
  }
}
