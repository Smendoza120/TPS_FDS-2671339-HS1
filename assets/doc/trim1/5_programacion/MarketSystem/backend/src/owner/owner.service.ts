import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from './owner.entity';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateOwner } from './dto/create-owner.dto';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async createOwner(id: number, owner: CreateOwner) {
    const userFound = await this.userRepository.findOne({
      where: {
        id_user: id
      }
    });


    if (!userFound) {
      return new HttpException('Oscar es gay', HttpStatus.NOT_FOUND);
    }

    const newOwner = this.ownerRepository.create(owner);
    const saveOwner = await this.ownerRepository.save(newOwner);

    userFound.owner = saveOwner;

    return this.userRepository.save(userFound);
  }
}
