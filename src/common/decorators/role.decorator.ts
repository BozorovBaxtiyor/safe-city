// role.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/roles.enum';


export const rolesKey = 'roles';
export const Role = (...roles: UserRole[]): ReturnType<typeof SetMetadata> =>
    SetMetadata(rolesKey, roles);
