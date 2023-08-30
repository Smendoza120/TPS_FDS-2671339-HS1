import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./users.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>
  ) {}

  createUser(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  getAllUsers() {
    return this.userRepository.find();
  }

  getUser(id: number) {
    return this.userRepository.findOne({ where: { id_user: id } });
  }

  getByEmail(mail: string) {
    return this.userRepository.findOne({ where: { mail } });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id_user: id });
  }

  updateUser(id: number, user: UpdateUserDto) {
    return this.userRepository.update(id, user);
  }
}
