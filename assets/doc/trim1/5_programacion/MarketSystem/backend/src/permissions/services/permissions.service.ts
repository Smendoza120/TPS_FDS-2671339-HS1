import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permissions } from '../entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permissions)
    private readonly permissionsRepository: Repository<Permissions>,
  ) {}

  async getPermission(id: number): Promise<Permissions> {
    const permission = await this.permissionsRepository.findOne({
      where: { id_permissions: id },
    });
    if (!permission) {
      throw new NotFoundException('Permiso no encontrado');
    }
    return permission;
  }

  async createPermission(
    createPermission: CreatePermissionDto,
  ): Promise<Permissions> {
    const permission = this.permissionsRepository.create(createPermission);
    return this.permissionsRepository.save(permission);
  }

  async getAllPermissions() {
    const permission = await this.permissionsRepository.find();
    if (!permission) {
      throw new NotFoundException('Permisos no encontrados');
    }
    return permission;
  }

  async updatePermission(
    id: number,
    updatePermission: UpdatePermissionDto,
  ): Promise<Permissions> {
    const permission = await this.getPermission(id);
    this.permissionsRepository.merge(permission, updatePermission);
    return this.permissionsRepository.save(permission);
  }

  async deletePermission(id: number): Promise<void> {
    const permission = await this.getPermission(id);
    await this.permissionsRepository.remove(permission);
  }
}
