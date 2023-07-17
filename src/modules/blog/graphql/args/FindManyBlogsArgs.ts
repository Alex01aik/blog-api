import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsUUID } from 'class-validator';
import { PaginationArgs } from 'src/common/graphql/args/PaginationArgs';

@ArgsType()
export class FindManyBlogsArgs extends PaginationArgs {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  userId?: string;
}
