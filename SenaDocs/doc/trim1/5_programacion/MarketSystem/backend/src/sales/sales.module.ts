import { Module } from '@nestjs/common';
import { SalesService } from './services/sales.service';
import { SalesController } from './controllers/sales.controller';
import { Sales } from './entities/sales.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Sales, Customer, Inventory, Bill])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
