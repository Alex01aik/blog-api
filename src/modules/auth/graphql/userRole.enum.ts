import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  writer = 'writer',
  moderator = 'moderator',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
