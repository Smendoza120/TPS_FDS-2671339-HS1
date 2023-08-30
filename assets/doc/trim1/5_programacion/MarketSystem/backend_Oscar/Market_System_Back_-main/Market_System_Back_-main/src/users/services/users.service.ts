import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const newUser = this.usersRepository.create(data);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find({
      relations: ['owner'],
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id_users: id },
    }); // 👈 use repo
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }

  findByEmail(mail: string) {
    return this.usersRepository.findOne({ where: { mail } });
  }

  async update(id: number, changes: UpdateUserDto) {
    const userUpdate = await this.usersRepository.findOne({
      where: { id_users: id },
    });
    this.usersRepository.merge(userUpdate, changes);
    return this.usersRepository.save(userUpdate);
  }

  async remove(id: number) {
    const userDelete = await this.usersRepository.delete(id); // 👈 use repo
    if (!userDelete) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return userDelete;
  }
}
