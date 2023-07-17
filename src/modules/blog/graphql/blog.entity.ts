import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/graphql/user.entity';
import { Post } from '../../post/graphql/post.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.blogs)
  user: User;

  @OneToMany(() => Post, (post) => post.blog)
  posts?: Post[];
}
