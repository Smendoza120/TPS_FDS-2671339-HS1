import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { InventoryService } from '../services/invenotory.service';
import { InventoryDto } from '../dto/inventory-dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @ApiOperation({
    description: 'Create a new inventory',
  })
  @Post()
  async create(@Body() dto: InventoryDto) {
    const inventory = await this.inventoryService.create(dto);
    return { id: inventory.idInventory };
  }

  @ApiOperation({
    description: 'Update an inventory by id',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: InventoryDto) {
    try {
      const inventory = await this.inventoryService.update(id, dto);
      return inventory;
    } catch (e) {
      throw new NotFoundException('Inventory not found');
    }
  }

  @ApiOperation({
    description: 'Get all inventories',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const inventory = await this.inventoryService.findById(id);
      return inventory;
    } catch (e) {
      throw new NotFoundException('Inventory not found');
    }
  }

  @ApiOperation({
    description: 'Get an inventory by id',
  })
  @Get()
  async find() {
    const inventories = await this.inventoryService.find();
    return inventories;
  }

  @ApiOperation({
    description: 'Delete an inventory by id',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.inventoryService.delete(id);
      return { message: 'Inventory deleted successfully' };
    } catch (e) {
      throw new NotFoundException('Inventory not found');
    }
  }
}