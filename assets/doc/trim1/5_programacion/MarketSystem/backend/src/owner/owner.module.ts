import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owner.entity';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Users])],
  providers: [OwnerService, UsersService],
  controllers: [OwnerController, UsersController],
  exports: [TypeOrmModule]
})
export class OwnerModule {}
