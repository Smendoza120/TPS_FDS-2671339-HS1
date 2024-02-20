import {
  Controller,
  Post,
  Body,
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

  
}