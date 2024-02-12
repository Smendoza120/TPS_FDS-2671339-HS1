import { Module } from '@nestjs/common';
import { BillsService } from './services/bills.service';
import { BillsController } from './controllers/bills.controller';

@Module({
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
