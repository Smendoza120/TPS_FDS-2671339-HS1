import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SalesService } from '../services/sales.service';
import { SalesDto } from '../dto/sales-dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { ReportsSalesEntity } from '../entities/reports.entity';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @ApiOperation({
    description: 'Create a new sale',
  })
  @Post()
  async create(@Body() dto: SalesDto) {
    return await this.salesService.create(dto);
  }

  @ApiOperation({
    description: 'Get all sales',
  })
  @Get()
  async find() {
    return await this.salesService.find();
  }

  @ApiOperation({
    description: 'Get a sale by id',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.salesService.findById(id);
  }

  @ApiOperation({
    description: 'Update a sale by id',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: SalesDto) {
    return await this.salesService.update(id, dto);
  }

  @ApiOperation({
    description: 'Delete a sale by id',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.salesService.delete(id);
  }

  @ApiOperation({
    description: 'Generate daily sales report',
  })
  @Get('report/:date')
  async generateDailyReport(@Param('date') date: string) {
    return await this.salesService.generateDailyReport(new Date(date));
  }

  @ApiOperation({
    description: 'Get sales by date',
  })
  @Get('date/:date')
  async getSalesByDate(@Param('date') date: string) {
    return await this.salesService.getSalesByDate(new Date(date));
  }

  @ApiOperation({
    description: 'Save sales report',
  })
  @Post('report')
  async saveReport(@Body() report: ReportsSalesEntity) {
    return await this.salesService.saveReport(report);
  }
}