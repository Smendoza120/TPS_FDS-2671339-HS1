import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { CustomerEntity } from '../entities/customers.entity';
import { CustomerDto } from '../dto/customer-dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMERS_REPOSITORY')
    private iCustomerEntity: Repository<CustomerEntity>,
    private userService: UsersService
  ) {}

  async create(dto: CustomerDto): Promise<CustomerEntity> {
    try {
      const user = await this.userService.getUserById(dto.userId);
      if (!user) {
        throw new Error(`User with ID ${dto.userId} not found`);
      }
      
      const customer = new CustomerEntity();
      customer.user = user; 
      
      await this.iCustomerEntity.save(customer);
      
      return customer;
    } catch (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }
  
  async update(id: string, dto: CustomerDto): Promise<CustomerEntity> {
    try {
      const customer = await this.findOne(id);
      if (!customer) {
        throw new Error(`Customer with ID ${id} not found`);
      }

      const user = await this.userService.getUserById(dto.userId);
      if (!user) {
        throw new Error(`User with ID ${dto.userId} not found`);
      }
      
      customer.user = user;
      
      await this.iCustomerEntity.save(customer);
      
      return customer;
    } catch (error) {
      throw new Error(`Failed to update customer: ${error.message}`);
    }
  }
  
  async findOne(id: string): Promise<CustomerEntity> {
    try {
      const customer = await this.iCustomerEntity.findOne({where: {idCustomer: id}});
      if (!customer) {
        throw new Error(`Customer with ID ${id} not found`);
      }
      return customer;
    } catch (error) {
      throw new Error(`Failed to find customer: ${error.message}`);
    }
  }
  
  async find(): Promise<CustomerEntity[]> {
    try {
      return await this.iCustomerEntity.find();
    } catch (error) {
      throw new Error(`Failed to find customers: ${error.message}`);
    }
  }
  
  async delete(id: string): Promise<void> {
    try {
      const customer = await this.findOne(id);
      if (!customer) {
        throw new Error(`Customer with ID ${id} not found`);
      }
      await this.userService.delete(customer.user.idUser);
      await this.iCustomerEntity.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete customer: ${error.message}`);
    }
  }
  
  async findByEmail(email: string): Promise<CustomerEntity> {
    try {
      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new Error(`User with email ${email} not found`);
      }
      const customer = await this.iCustomerEntity.findOne({ where: { idCustomer: user.idUser } });
      if (!customer) {
        throw new Error(`Customer with user ID ${user.idUser} not found`);
      }
      return customer;
    } catch (error) {
      throw new Error(`Failed to find customer by email: ${error.message}`);
    }
  }
  
  async findById(id: string): Promise<CustomerEntity> {
    try {
      const customer = await this.iCustomerEntity.findOne({ where: { idCustomer: id } });
      if (!customer) {
        throw new Error(`Customer with ID ${id} not found`);
      }
      return customer;
    } catch (error) {
      throw new Error(`Failed to find customer by ID: ${error.message}`);
    }
  }
}