import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { UserDto, UpdateUserDto } from 'src/dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private iUserRepository: Repository<UserEntity>,
  ) {}

  async create(dto: UserDto): Promise<UserEntity> {
    const user = new UserEntity();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.phone = dto.phone;
    return await this.iUserRepository.save(user);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.iUserRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.iUserRepository.findOneOrFail({
      where: {
        idUser: id,
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> { //obtener po usuario
    return await this.iUserRepository.findOneOrFail({
      where: {
        email: email,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getUserById(id);
    Object.assign(user, dto);
    await this.iUserRepository.save(user);
    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    const user = await this.getUserById(id);
    await this.iUserRepository.delete(id);
    return user;
  }
}
