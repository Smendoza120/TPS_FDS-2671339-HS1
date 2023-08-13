import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { Owner } from 'src/owner/owner.entity';
import { OwnerService } from 'src/owner/owner.service';
import { OwnerController } from 'src/owner/owner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Owner])],
  providers: [UsersService, OwnerService],
  controllers: [UsersController, OwnerController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
