import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BillsService } from '../services/bills.service';
import { CreateBillDto } from '../dto/create-bill.dto';
import { UpdateBillDto } from '../dto/update-bill.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  create(@Body() payload: CreateBillDto) {
    return this.billsService.create(payload);
  }

  @Get()
  findAll() {
    return this.billsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.billsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBillDto,
  ) {
    return this.billsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.billsService.remove(id);
  }
}
