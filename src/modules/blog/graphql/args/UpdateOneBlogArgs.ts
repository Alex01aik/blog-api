import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@ArgsType()
export class UpdateOneBlogArgs {
  @IsUUID()
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;
}
