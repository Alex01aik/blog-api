import { Field, ArgsType } from '@nestjs/graphql';
import { UserRole } from '../../../auth/graphql/userRole.enum';
import { IsEmail } from 'class-validator';

@ArgsType()
export class CreateOneUserArgs {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  // TODO add validation
  password: string;

  @Field(() => UserRole, { defaultValue: UserRole.writer })
  role?: UserRole;
}
