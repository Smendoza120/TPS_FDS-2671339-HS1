import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async getAllPermissions() {
    return this.permissionsService.getAllPermissions();
  }

  @Get(':id')
  async getPermission(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.getPermission(id);
  }

  @Post()
  async createPermission(@Body() createPermission: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermission);
  }

  @Patch(':id')
  async updatePermission(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermission: UpdatePermissionDto,
  ) {
    return this.permissionsService.updatePermission(id, updatePermission);
  }

  @Delete(':id')
  async deletePermission(@Param('id', ParseIntPipe) id: number) {
    return this.permissionsService.deletePermission(id);
  }
}
