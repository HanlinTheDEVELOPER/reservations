import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

const getCurrentUserByContext = (ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator<UserDto>(
  (data: unknown, ctx: ExecutionContext) => getCurrentUserByContext(ctx),
);
