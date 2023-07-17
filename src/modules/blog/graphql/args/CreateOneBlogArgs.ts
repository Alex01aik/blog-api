import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateOneBlogArgs {
  @Field()
  name: string;
}
