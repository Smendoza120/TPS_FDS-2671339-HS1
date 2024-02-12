import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerDto } from '../dto/customer-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({
    description: 'Create customer',
  })
  @Post()
  async create(@Body() dto: CustomerDto) {
    const customer = await this.customerService.create(dto);
    return { id: customer.idCustomer };
  }

  @ApiOperation({
    description: 'Update customer',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CustomerDto) {
    try {
      const customer = await this.customerService.update(id, dto);
      return customer;
    } catch (e) {
      throw new NotFoundException('Customer not found');
    }
  }

  @ApiOperation({
    description: 'Get customer by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const customer = await this.customerService.findOne(id);
      return customer;
    } catch (e) {
      throw new NotFoundException('Customer not found');
    }
  }

  @ApiOperation({
    description: 'Get all customers',
  })
  @Get()
  async find() {
    const customers = await this.customerService.find();
    return customers;
  }

  @ApiOperation({
    description: 'Delete customer',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.customerService.delete(id);
      return { message: 'Customer deleted successfully' };
    } catch (e) {
      throw new NotFoundException('Customer not found');
    }
  }

  @ApiOperation({
    description: 'Get customer by email',
  })
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      const customer = await this.customerService.findByEmail(email);
      return customer;
    } catch (e) {
      throw new NotFoundException('Customer not found');
    }
  }

  @ApiOperation({
    description: 'Get customer by id',
  })
  @Get('id/:id')
  async findById(@Param('id') id: string) {
    try {
      const customer = await this.customerService.findById(id);
      return customer;
    } catch (e) {
      throw new NotFoundException('Customer not found');
    }
  }
}
