import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from '..//blog.service';
import { Blog } from '../graphql/blog.entity';
import { PaginationArgs } from 'src/common/graphql/args/PaginationArgs';
import { BlogResolver } from '../graphql/blog.resolver';
import { mockBlogs } from './mockBlogs';

describe('BlogsResolver', () => {
  let resolver: BlogResolver;
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogResolver, BlogService],
    }).compile();

    resolver = module.get<BlogResolver>(BlogResolver);
    service = module.get<BlogService>(BlogService);
  });

  describe('findManyBlogs', () => {
    it('should return an array of blogs', async () => {
      const args: PaginationArgs = {};

      const blogs: Blog[] = mockBlogs as Blog[];
      jest.spyOn(service, 'findMany').mockResolvedValue(blogs);

      const result = await resolver.findManyBlogs(args);

      console.log('result', result);
      console.log('blogs', blogs);

      expect(result).toEqual(blogs);
      expect(service.findMany).toHaveBeenCalledWith(args);
    });
  });
});
