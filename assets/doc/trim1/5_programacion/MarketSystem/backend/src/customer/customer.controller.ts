import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Delete,
  Body,
  ParseIntPipe,
} from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Controller("customer")
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  createCustomer(@Body() customer: CreateCustomerDto) {
    return this.customerService.createCustomer(customer);
  }

  @Get()
  getAllCustomer() {
    return this.customerService.getAllCustomers();
  }

  @Get(":id")
  getCustomer(@Param("id", ParseIntPipe) id: number) {
    return this.customerService.getCustomer(id);
  }

  // @Patch(":id")
  // updateCustomer(
  //   @Param("id", ParseIntPipe) id: number,
  //   @Body() customer: UpdateCustomerDto
  // ) {
  //   return this.customerService.updateCustomer(id, customer);
  // }

  @Delete(":id")
  deleteCustomer(@Param("id", ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id);
  }
}
