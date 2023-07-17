import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../user.service';
import { User } from './user.entity';
import { UpdateOneUserArgs } from './args/UpdateOneUserArgs';
import { UniqueArgs } from '../../../common/graphql/args/UniqueArgs';
import { SuccessOutput } from '../../../common/graphql/dto/SuccessOutput';
import { UseGuards } from '@nestjs/common';
import { UserRole } from '../../auth/graphql/userRole.enum';
import { Roles } from '../../auth/utils/RolesDecorator';
import { RoleGuard } from '../../auth/guard/role.guard';
import { AllowOwner } from '../../auth/utils/AllowOwnerDecorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  // TODO maybe add for moderator but now you can create user via register endpoint
  // @Mutation(() => User)
  // async createOneUser(@Args() args: CreateOneUserArgs): Promise<User> {
  //   const user = await this.userService.create(args);
  //   return user;
  // }

  @UseGuards(RoleGuard)
  @Roles(UserRole.moderator)
  @AllowOwner()
  @Mutation(() => SuccessOutput)
  async deleteOneUser(@Args() args: UniqueArgs): Promise<SuccessOutput> {
    await this.userService.delete(args.id);
    return { success: true };
  }

  @UseGuards(RoleGuard)
  @Roles(UserRole.moderator)
  @Mutation(() => SuccessOutput)
  async updateOneUser(@Args() args: UpdateOneUserArgs): Promise<SuccessOutput> {
    await this.userService.update(args);
    return { success: true };
  }
}
