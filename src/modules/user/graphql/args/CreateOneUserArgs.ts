import { Field, ArgsType } from '@nestjs/graphql';
import { UserRole } from '../../../auth/graphql/userRole.enum';

@ArgsType()
export class CreateOneUserArgs {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRole, { defaultValue: UserRole.writer })
  role?: UserRole;
}
