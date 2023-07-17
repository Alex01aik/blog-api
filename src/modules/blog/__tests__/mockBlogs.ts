import { UserRole } from 'src/modules/auth/graphql/userRole.enum';
import { Blog } from 'src/modules/blog/graphql/blog.entity';

export const mockBlogs: Partial<Blog>[] = [
  {
    id: '2f12cac2-2259-4c8d-8d14-3dcd0c14fa1c',
    name: 'First blog',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: {
      id: '00000000-0000-0000-0000-000000000000',
      email: 'admin@admin.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      role: UserRole.moderator,
      password: '',
    } as any,
  },
];
