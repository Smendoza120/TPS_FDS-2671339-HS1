import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/ms/entities/users.entity';
import { UserDto, UpdateUserDto } from 'src/ms/dto/user-dto';

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
    try {
      return await this.iUserRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      return await this.iUserRepository.find();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getUserById(id: string): Promise<UserEntity> {
    try {
      return await this.iUserRepository.findOneOrFail({
        where: {
          idUser: id,
        },
      });
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    try {
      return await this.iUserRepository.findOneOrFail({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.getUserById(id);
    Object.assign(user, dto);
    try {
      await this.iUserRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<UserEntity> {
    const user = await this.getUserById(id);
    try {
      await this.iUserRepository.delete(id);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}