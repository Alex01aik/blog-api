import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../graphql/userRole.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
