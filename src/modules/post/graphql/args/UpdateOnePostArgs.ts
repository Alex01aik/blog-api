import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class UpdateOnePostArgs {
  @IsUUID()
  @Field()
  id: string;

  @Field()
  context?: string;
}
