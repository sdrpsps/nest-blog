import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { user } from '@prisma/client';
import { Observable } from 'rxjs';
import { Role } from '../enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    /* 打印当前用户 */
    const user = context.switchToHttp().getRequest().user as user
    /* 打印元数据的角色 */
    const roles = this.reflector.getAllAndMerge<Role[]>('roles', [context.getHandler(), context.getClass()])
    return roles.length ? roles.some((role) => { user.role === role }) : true;
  }
}
