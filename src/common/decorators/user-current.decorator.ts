import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

export const UserCurrent = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request: Request & { sub?: string } = ctx.switchToHttp().getRequest();

    if (!request.sub) {
      throw new UnauthorizedException('User ID (sub) not found in request');
    }

    return request.sub;
  },
);
