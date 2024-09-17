import { DatabaseModule } from '@app/common';
import { Module } from '@nestjs/common';
import { UserDocument, UserSchema } from './models/user.schema';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserMicroserviceController } from './userMicroservice.controller';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: UserDocument.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController, UserMicroserviceController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
