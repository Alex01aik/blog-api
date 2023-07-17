import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './graphql/post.entity';
import { PostResolver } from './graphql/post.resolver';
import { PostService } from './post.service';
import { BlogModule } from '../blog/blog.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), BlogModule],
  providers: [PostResolver, PostService],
})
export class PostModule {}
