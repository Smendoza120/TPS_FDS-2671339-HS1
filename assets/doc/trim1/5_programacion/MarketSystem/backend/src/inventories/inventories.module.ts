import { Module } from '@nestjs/common';
import { InventoriesService } from './services/inventories.service';
import { InventoriesController } from './controllers/inventories.controller';

@Module({
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule {}
