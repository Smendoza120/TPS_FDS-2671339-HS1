import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete
} from '@nestjs/common';
import { BillsEntity } from '../entities/bills.entity';
import { BillsService } from '../services/bills.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBillDto } from '../dto/bills.dto';

@ApiTags('bills')
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @ApiOperation({
    description: 'Create bill',
  })
  @Post()
  async create(@Body() createBillDto: CreateBillDto): Promise<BillsEntity> {
    return this.billsService.createBillForCustomerOnDate(createBillDto);
  }

  @ApiOperation({
    description: 'Get all bills',
  })
  @Get()
  async findAll(): Promise<BillsEntity[]> {
    return this.billsService.getAllBills();
  }

  @ApiOperation({
    description: 'Update bill',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() bill: Partial<BillsEntity>,
  ): Promise<BillsEntity> {
    return this.billsService.updateBill(id, bill);
  }

  @ApiOperation({
    description: 'Delete bill',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.billsService.deleteBill(id);
  }
}