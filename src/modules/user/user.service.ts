import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './graphql/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOneUserArgs } from './graphql/args/CreateOneUserArgs';
import { UpdateOneUserArgs } from './graphql/args/UpdateOneUserArgs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    return await this.userRepository.findOneBy({
      id,
    });
  }
  async create(args: CreateOneUserArgs) {
    const isExist = await this.findByUsername(args.email);
    if (isExist) {
      throw new BadRequestException('User already existed');
    }

    return await this.userRepository.save(args);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  async update(args: UpdateOneUserArgs) {
    return await this.userRepository.update(args.id, args);
  }

  async findByUsername(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }
}
