import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from '../post.service';
import { Post } from './post.entity';
import { UniqueArgs } from 'src/common/graphql/args/UniqueArgs';
import { CreateOnePostArgs } from './args/CreateOnePostArgs';
import { UpdateOnePostArgs } from './args/UpdateOnePostArgs';
import { SuccessOutput } from 'src/common/graphql/dto/SuccessOutput';
import { CurrentUser } from 'src/modules/auth/utils/CurrentUserDecorator';
import { User } from 'src/modules/user/graphql/user.entity';
import { isOwnerOrAllowedRole } from 'src/modules/auth/utils/isOwnerOrAllowedRole';
import { UserRole } from 'src/modules/auth/graphql/userRole.enum';
import { BlogService } from 'src/modules/blog/blog.service';
import { Blog } from 'src/modules/blog/graphql/blog.entity';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/modules/auth/guard/jwt.guard';
import { FindManyPostsArgs } from './args/FindManyPostsArgs';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private blogService: BlogService,
  ) {}

  @Query(() => [Post], { nullable: true })
  async findManyPostsByBlogId(
    @Args() args: FindManyPostsArgs,
  ): Promise<Post[]> {
    return await this.postService.findManyByBlogId(args);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Post)
  async createOnePost(
    @Args() args: CreateOnePostArgs,
    @CurrentUser() user: User,
  ): Promise<Post> {
    const blog: Blog = await this.blogService.findOneById(args.blogId);
    isOwnerOrAllowedRole(blog.user, user);

    return await this.postService.create(args);
  }

  @Query(() => Post, { nullable: true })
  async findOnePost(@Args() args: UniqueArgs): Promise<Post> {
    return await this.postService.findOneById(args.id);
  }

  @UseGuards(JwtGuard)
  @Mutation(() => Post)
  async updateOnePost(
    @Args() args: UpdateOnePostArgs,
    @CurrentUser() user: User,
  ): Promise<SuccessOutput> {
    const post: Post = await this.postService.findOneById(args.id);
    isOwnerOrAllowedRole(post.blog.user, user, [UserRole.moderator]);

    await this.postService.update(args);
    return { success: true };
  }

  @UseGuards(JwtGuard)
  @Mutation(() => SuccessOutput)
  async deleteOnePost(
    @Args() args: UniqueArgs,
    @CurrentUser() user: User,
  ): Promise<SuccessOutput> {
    const post: Post = await this.postService.findOneById(args.id);
    isOwnerOrAllowedRole(post.blog.user, user, [UserRole.moderator]);

    await this.postService.delete(args.id);
    return { success: true };
  }
}
