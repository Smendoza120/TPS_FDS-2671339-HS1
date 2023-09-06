import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees() {
    return this.employeeService.getAllEmployees();
  }

  @Get(':id')
  async getEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.getEmployee(id);
  }

  @Post()
  async createEmployee(@Body() createEmployee: CreateEmployeeDto) {
    return this.employeeService.createEmployee(createEmployee);
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployee: UpdateEmployeeDto,
  ) {
    return this.employeeService.updateEmployee(id, updateEmployee);
  }

  @Delete(':id')
  async deleteEmployee(@Param('id', ParseIntPipe) id: number) {
    return this.employeeService.deleteEmployee(id);
  }
}
