import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Employee } from '../entities/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async getEmployee(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: {
        id_employee: id,
      },
    });
    if (!employee) {
      throw new NotFoundException('Empleado no encontrado');
    }
    return employee;
  }

  async getAllEmployees(): Promise<Employee[]> {
    const employee = await this.employeeRepository.find();
    if (!employee) {
      throw new NotFoundException('Empleados no encontrados');
    }
    return employee;
  }

  async createEmployee(createEmployee: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployee);
    return this.employeeRepository.save(employee);
  }

  async updateEmployee(
    id: number,
    updateEmployee: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.getEmployee(id);
    this.employeeRepository.merge(employee, updateEmployee);
    return this.employeeRepository.save(employee);
  }

  async deleteEmployee(id: number) {
    const employee = await this.getEmployee(id);
    await this.employeeRepository.remove(employee);
  }
}
