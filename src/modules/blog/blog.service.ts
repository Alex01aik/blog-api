import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './graphql/blog.entity';
import { CreateOneBlogArgs } from './graphql/args/CreateOneBlogArgs';
import { UpdateOneBlogArgs } from './graphql/args/UpdateOneBlogArgs';
import { isExist } from 'src/common/utils/isExist';
import { FindManyBlogsArgs } from './graphql/args/FindManyBlogsArgs';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async findMany(args: FindManyBlogsArgs) {
    return await this.blogRepository.find({
      ...args,
      where: {
        user: {
          id: args.userId,
        },
      },
    });
  }

  async findOneById(id: string) {
    const blog: Blog = await this.blogRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
    isExist(blog);

    return blog;
  }

  async create(args: CreateOneBlogArgs & { userId: string }) {
    return await this.blogRepository.save({
      ...args,
      user: {
        id: args.userId,
      },
    });
  }

  async delete(id: string) {
    return await this.blogRepository.delete(id);
  }

  async update(args: UpdateOneBlogArgs) {
    return await this.blogRepository.update(args.id, args);
  }
}
