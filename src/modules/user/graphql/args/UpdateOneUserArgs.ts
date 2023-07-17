import { Field, ArgsType } from '@nestjs/graphql';
import { UserRole } from '../../../auth/graphql/userRole.enum';
import { IsUUID } from 'class-validator';

@ArgsType()
export class UpdateOneUserArgs {
  @IsUUID()
  @Field()
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;
}
