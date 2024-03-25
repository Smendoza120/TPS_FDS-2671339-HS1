import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { TempSalesService } from '../services/temp.service';
import { SalesDto } from '../dto/sales-dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { TempSalesEntity} from '../entities/TempSales.entity'
import { SalesEntity } from '../entities/sales.entity';

@ApiTags('temp-sales')
@Controller('temp-sales')
export class TempSalesController {
  constructor(private readonly tempSalesService: TempSalesService) {}

  @ApiOperation({
    description: 'Create a new temporary sale',
  })
  @Post()
  async create(@Body() dto: SalesDto): Promise<TempSalesEntity> {
    return await this.tempSalesService.create(dto);
  }

  @ApiOperation({
    description: 'Get all temporary sales',
  })
  @Get()
  async findAll(): Promise<TempSalesEntity[]> {
    return await this.tempSalesService.findAll();
  }

  @ApiOperation({
    description: 'Get a temporary sale by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TempSalesEntity> {
    return await this.tempSalesService.findOne(id);
  }

  @ApiOperation({
    description: 'Delete a temporary sale by id',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.tempSalesService.delete(id);
  }

  @ApiOperation({
    description: 'Confirm all temporary sales',
  })
  @Post('confirm')
  async confirmSale(): Promise<SalesEntity[]> {
    return await this.tempSalesService.confirmSale();
  }
}