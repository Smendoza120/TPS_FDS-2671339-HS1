import { Module } from '@nestjs/common';
import { PermissionsService } from './services/permissions.service';
import { PermissionsController } from './controllers/permissions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { Permissions } from './entities/permission.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Permissions, Employee])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
