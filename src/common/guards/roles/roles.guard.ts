// http-role.guard.ts
import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { rolesKey } from '../../decorators/role.decorator';
import { UserRole } from '../../enums/roles.enum';
import { IJwtPayload } from '../../types/types';

@Injectable()
export class HttpRoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true;
        }

        const requiredRole = this.reflector.getAllAndOverride<UserRole[] | UserRole>(rolesKey, [
            context.getHandler(),
            context.getClass(),
        ]);

        const { user }: { user: IJwtPayload } = context.switchToHttp().getRequest();

        if (!user?.role) {
            throw new HttpException(
                {
                    status: 'error',
                    message: 'Unauthorized access',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }

        const hasPermission = requiredRole?.includes(user.role as UserRole);

        if (!hasPermission) {
            throw new HttpException(
                {
                    status: 'error',
                    message: `This action requires ${requiredRole} role or higher`,
                },
                HttpStatus.FORBIDDEN,
            );
        }

        return true;
    }
}
