import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedAdmin } from './auth_types';

export const CurrentAdmin = createParamDecorator(
  (data: keyof AuthenticatedAdmin | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const admin = request.user as AuthenticatedAdmin;

    return data ? admin?.[data] : admin;
  },
);
