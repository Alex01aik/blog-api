import { Field, ArgsType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { PaginationArgs } from 'src/common/graphql/args/PaginationArgs';

@ArgsType()
export class FindManyPostsArgs extends PaginationArgs {
  @IsUUID()
  @Field()
  blogId: string;
}
