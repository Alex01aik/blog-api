import { Field, ObjectType } from '@nestjs/graphql';
import { Blog } from '../../blog/graphql/blog.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from '../../auth/graphql/userRole.enum';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: UserRole.writer })
  @Field(() => UserRole)
  role: UserRole;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs?: Blog[];
}
