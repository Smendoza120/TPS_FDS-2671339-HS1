import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUser } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  createUser(user: CreateUser) {
    return this.userRepository.save(user);
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    return this.userRepository.findOne({ where: { id_users: id } });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id_users: id});
  }
}
