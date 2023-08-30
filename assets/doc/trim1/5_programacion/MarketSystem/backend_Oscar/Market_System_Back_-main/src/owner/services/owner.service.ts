import { Injectable } from '@nestjs/common';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { UpdateOwnerDto } from '../dto/update-owner.dto';
import { Owner } from '../entities/owner.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(data: CreateOwnerDto) {
    const newOwner = this.ownerRepository.create(data);
    const hashPassword = await bcrypt.hash(newOwner.password, 10);
    newOwner.password = hashPassword;
    if (data.id_users) {
      const user = await this.userRepository.findOne({
        where: { id_users: data.id_users },
      });
      newOwner.user = user;
    }
    return this.ownerRepository.save(newOwner);
  }

  findAll() {
    return `This action returns all owner`;
  }

  findOne(id: number) {
    return `This action returns a #${id} owner`;
  }

  update(id: number, updateOwnerDto: UpdateOwnerDto) {
    return `This action updates a #${id} owner` + updateOwnerDto;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
