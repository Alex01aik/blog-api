import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './graphql/post.entity';
import { CreateOnePostArgs } from './graphql/args/CreateOnePostArgs';
import { UpdateOnePostArgs } from './graphql/args/UpdateOnePostArgs';
import { isExist } from '../../common/utils/isExist';
import { FindManyPostsArgs } from './graphql/args/FindManyPostsArgs';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async findManyByBlogId(args: FindManyPostsArgs) {
    return await this.postRepository.find({
      ...args,
      where: {
        blog: {
          id: args.blogId,
        },
      },
    });
  }

  async create(args: CreateOnePostArgs) {
    return await this.postRepository.save({
      ...args,
      blog: {
        id: args.blogId,
      },
    });
  }

  async findOneById(id: string) {
    const post: Post = await this.postRepository.findOne({
      where: { id },
      relations: {
        blog: {
          user: true,
        },
      },
    });
    isExist(post);

    return post;
  }

  async update(args: UpdateOnePostArgs) {
    return await this.postRepository.update(args.id, args);
  }

  async delete(id: string) {
    return await this.postRepository.delete(id);
  }

  //   async findMany(take?: number, skip?: number) {
  //     return await this.postRepository.find();
  //   }
}
