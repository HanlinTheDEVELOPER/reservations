import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateEmail(createUserDto.email);
    return await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password: returnPassword, ...rest } = user;
    return rest;
  }

  async getUser(id: string | Types.ObjectId) {
    const user = await this.userRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    const { password, ...rest } = user;
    return rest;
  }

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: string) {
    return this.userRepository.findOne({ _id: new Types.ObjectId(id) });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateUserDto,
    );
  }

  remove(id: string) {
    return this.userRepository.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });
  }

  private async validateEmail(email: string) {
    try {
      await this.userRepository.findOne({ email });
    } catch (error) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }
}
