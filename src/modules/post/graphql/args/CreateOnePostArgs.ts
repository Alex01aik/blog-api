import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class CreateOnePostArgs {
  @Field()
  context: string;

  @IsUUID()
  @Field()
  blogId: string;
}
