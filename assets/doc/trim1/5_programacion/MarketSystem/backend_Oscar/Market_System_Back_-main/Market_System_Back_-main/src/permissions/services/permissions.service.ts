import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { Permissions } from '../entities/permission.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    @InjectRepository(Permissions)
    private permissionsRepository: Repository<Permissions>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async createEmployee(data: CreatePermissionDto) {
    const permissions = this.permissionsRepository.create(data);
    if (data.id_employee) {
      const employee = await this.employeeRepository.findOne({
        where: { id_employee: data.id_employee },
      });
      permissions.employee = employee;
    }
    return this.permissionsRepository.save(permissions);
  }

  async create(data: CreatePermissionDto) {
    const permissions = this.permissionsRepository.create(data);
    if (data.id_owner) {
      const owner = await this.ownerRepository.findOne({
        where: { id_owner: data.id_owner },
      });
      permissions.owner = owner;
    }
    return this.permissionsRepository.save(permissions);
  }

  findAll() {
    return this.permissionsRepository.find({
      relations: ['owner'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  async update(id: number, changes: UpdatePermissionDto) {
    const permissions = await this.permissionsRepository.findOne({
      where: { id_permissions: id },
    });
    if (changes.id_owner) {
      const owner = await this.ownerRepository.findOne({
        where: { id_owner: changes.id_owner },
      });
      permissions.owner = owner;
    }
    this.permissionsRepository.merge(permissions, changes);
    return this.permissionsRepository.save(permissions);
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
