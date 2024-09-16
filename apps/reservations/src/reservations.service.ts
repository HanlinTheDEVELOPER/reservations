import { PAYMENT_SERVICE, UserDto } from '@app/common';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { catchError, map } from 'rxjs';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentClient: ClientProxy,
  ) {}

  async create(
    createReservationsDto: CreateReservationDto,
    { email, _id: userId }: UserDto,
  ) {
    return this.paymentClient
      .send('create_charge', {
        ...createReservationsDto.charge,
        email,
      })
      .pipe(
        map((res) => {
          return this.reservationRepository.create({
            ...createReservationsDto,
            invoiceId: res.id,
            userId,
          });
        }),
        catchError((err) => {
          throw new BadRequestException('Payment failed');
        }),
      );
  }

  async findAll() {
    return await this.reservationRepository.find({});
  }

  async findOne(id: string) {
    return await this.reservationRepository.findOne({
      _id: new Types.ObjectId(id),
    });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateReservationDto,
    );
  }

  async remove(id: string) {
    return await this.reservationRepository.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });
  }
}
