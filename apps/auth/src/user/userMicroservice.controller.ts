import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserMicroserviceController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user')
  findOne(@Payload() data: { _id: string }) {
    console.log('data', data);
    return this.userService.findOne(data._id);
  }
}
