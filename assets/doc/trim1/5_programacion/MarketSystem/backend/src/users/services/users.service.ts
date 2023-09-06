import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getUser(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id_users: id },
    }); // 👈 use repo
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUser);
    return this.usersRepository.save(user);
  }

  async getAllUsers() {
    return this.usersRepository.find({
      relations: ['owner'],
    });
  }

  async updateUser(id: number, updateUser: UpdateUserDto): Promise<User> {
    const user = await this.getUser(id);
    this.usersRepository.merge(user, updateUser);
    return this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUser(id); // 👈 use repo
    await this.usersRepository.remove(user);
  }

  // findByEmail(mail: string) {
  //   return this.usersRepository.findOne({ where: { mail } });
  // }

  async findByEmail(mail: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { mail },
      relations: ['owner'],
    });
  }
}
