import { User } from 'src/modules/user/graphql/user.entity';
import { UserRole } from '../graphql/userRole.enum';
import { ForbiddenException } from '@nestjs/common/exceptions';

export const isOwnerOrAllowedRole = (
  objectUser: User,
  user: User,
  allowedRoles?: UserRole[],
) => {
  if (
    !(
      allowedRoles?.some((role) => role === user.role) ||
      objectUser.id === user.id
    )
  ) {
    throw new ForbiddenException();
  }
};
