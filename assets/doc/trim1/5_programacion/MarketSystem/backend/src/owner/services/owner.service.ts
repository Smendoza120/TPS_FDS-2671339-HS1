import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { UpdateOwnerDto } from '../dto/update-owner.dto';
import { Owner } from '../entities/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {}

  async getOwner(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findOne({
      where: { id_owner: id },
    });
    if (!owner) {
      throw new NotFoundException('Propietario no encontrado');
    }
    return owner;
  }

  async getAllOwners() {
    const owner = await this.ownerRepository.find();
    if (!owner) {
      throw new NotFoundException('Propietario no encontrado');
    }
    return owner;
  }

  async createOwner(createOwner: CreateOwnerDto): Promise<Owner> {
    const owner = this.ownerRepository.create(createOwner);
    return this.ownerRepository.save(owner);
  }

  async updateOwner(id: number, updateOwner: UpdateOwnerDto): Promise<Owner> {
    const owner = await this.getOwner(id);
    this.ownerRepository.merge(owner, updateOwner);
    return this.ownerRepository.save(owner);
  }

  async deleteOwner(id: number): Promise<void> {
    const owner = await this.getOwner(id);
    await this.ownerRepository.remove(owner);
  }
}
