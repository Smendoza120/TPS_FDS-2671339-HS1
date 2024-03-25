import { Module } from '@nestjs/common';
import { WorkersController } from './controllers/workers.controller';
import { WorkersService } from './services/workers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomerController } from './controllers/customers.controller';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/products.service';
import { ProductController } from './controllers/products.controller';
import { InventoryService } from './services/invenotory.service';
import { InventoryController } from './controllers/inventory.controller';
import { SalesService } from './services/sales.service';
import { SalesController } from './controllers/sales.controller';
import { ReportService } from './services/reports.service';
import { ReportsController } from './controllers/reports.controller';
import { BillsService } from './services/bills.service';
import { BillsController } from './controllers/bills.controller';
import { SharingController } from './controllers/sharing.controller';
import { SharingService } from './services/sharing.service';
import { Providers } from './providers/providers';
import { DatabaseModule } from '../database/database.module';
import { TempSalesController } from './controllers/temp.controller';
import { TempSalesService } from './services/temp.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UsersController,
    WorkersController,
    CustomerController,
    ProductController,
    InventoryController,
    SalesController,
    ReportsController,
    BillsController,
    SharingController,
    TempSalesController,
  ],
  providers: [
    ...Providers,
    UsersService,
    WorkersService,
    CustomerService,
    ProductService,
    InventoryService,
    SalesService,
    ReportService,
    BillsService,
    SharingService,
    TempSalesService,
  ],
  exports: [
    ...Providers,
    UsersService,
    WorkersService,
    CustomerService,
    ProductService,
    InventoryService,
    SalesService,
    ReportService,
    BillsService,
    SharingService
  ],
})
export class MsModule {}
