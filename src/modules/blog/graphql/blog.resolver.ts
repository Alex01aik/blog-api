import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UniqueArgs } from 'src/common/graphql/args/UniqueArgs';
import { SuccessOutput } from 'src/common/graphql/dto/SuccessOutput';
import { BlogService } from '../blog.service';
import { Blog } from './blog.entity';
import { CreateOneBlogArgs } from './args/CreateOneBlogArgs';
import { UpdateOneBlogArgs } from './args/UpdateOneBlogArgs';
import { CurrentUser } from 'src/modules/auth/utils/CurrentUserDecorator';
import { User } from 'src/modules/user/graphql/user.entity';
import { isOwnerOrAllowedRole } from 'src/modules/auth/utils/isOwnerOrAllowedRole';
import { UserRole } from 'src/modules/auth/graphql/userRole.enum';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { PaginationArgs } from 'src/common/graphql/args/PaginationArgs';
import { FindManyBlogsArgs } from './args/FindManyBlogsArgs';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query(() => [Blog], { nullable: true })
  async findManyBlogs(@Args() args: PaginationArgs): Promise<Blog[]> {
    return await this.blogService.findMany(args);
  }

  @Query(() => [Blog], { nullable: true })
  async findManyBlogsByUserId(
    @Args() args: FindManyBlogsArgs,
  ): Promise<Blog[]> {
    return await this.blogService.findMany(args);
  }

  @Query(() => Blog, { nullable: true })
  async findOneBlog(@Args() args: UniqueArgs): Promise<Blog> {
    return await this.blogService.findOneById(args.id);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Blog)
  async createOneBlog(
    @Args() args: CreateOneBlogArgs,
    @CurrentUser() user: User,
  ): Promise<Blog> {
    return await this.blogService.create({ ...args, userId: user.id });
  }

  @UseGuards(JwtGuard)
  @Mutation(() => SuccessOutput)
  async deleteOneBlog(
    @Args() args: UniqueArgs,
    @CurrentUser() user: User,
  ): Promise<SuccessOutput> {
    const blog: Blog = await this.blogService.findOneById(args.id);

    isOwnerOrAllowedRole(blog.user, user, [UserRole.moderator]);

    await this.blogService.delete(args.id);
    return { success: true };
  }

  @UseGuards(JwtGuard)
  @Mutation(() => SuccessOutput)
  async updateOneBlog(
    @Args() args: UpdateOneBlogArgs,
    @CurrentUser() user: User,
  ): Promise<SuccessOutput> {
    const blog: Blog = await this.blogService.findOneById(args.id);

    isOwnerOrAllowedRole(blog.user, user, [UserRole.moderator]);

    await this.blogService.update(args);
    return { success: true };
  }
}
