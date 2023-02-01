import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const roles = req.user.roles;
    const isAdmin = roles.filter((item) => item.id === 1).length;
    return !!isAdmin;
  }
}
