import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './graphql/blog.entity';
import { BlogService } from './blog.service';
import { BlogResolver } from './graphql/blog.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  providers: [BlogResolver, BlogService],
  exports: [BlogService],
})
export class BlogModule {}
