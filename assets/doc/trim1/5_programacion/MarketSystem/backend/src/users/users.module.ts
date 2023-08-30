import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { Owner } from 'src/owner/owner.entity';
import { OwnerService } from 'src/owner/owner.service';
import { OwnerController } from 'src/owner/owner.controller';
import { Customer } from 'src/customer/customer.entity';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerController } from 'src/customer/customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Owner, Customer])],
  providers: [UsersService, OwnerService, CustomerService],
  controllers: [UsersController, OwnerController, CustomerController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
