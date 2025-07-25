import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return { data: user };
  }

  async getUsers() {
    return { data: await this.userRepository.find() };
  }

  async getUserById(id: string) {
    return {
      data: await this.userRepository.findOne({
        where: { id },
        relations: ['orders'],
      }),
    };
  }

  async getUserByUsername(username: string) {
    return {
      data: await this.userRepository.findOne({
        where: { username },
        relations: ['orders'],
      }),
    };
  }
}
