import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from 'src/common/decorators/roles.decorator'
import { UserRole } from 'src/modules/user/enums/user-role.enum'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredRoles) return true
    const { user } = context.switchToHttp().getRequest()
    const hasRole = requiredRoles.includes(user.role)
    if (hasRole) return true
    throw new ForbiddenException('Access Denied')
  }
}
