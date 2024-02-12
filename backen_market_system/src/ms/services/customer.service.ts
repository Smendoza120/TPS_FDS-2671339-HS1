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
    const user = await this.userService.getUserById(dto.userId);
    if (!user) {
      throw new Error(`User with ID ${dto.userId} not found`);
    }
    
    const customer = new CustomerEntity();
    customer.user = user; 
    
    await this.iCustomerEntity.save(customer);
    
    return customer;
  }
  
  async update(id: string, dto: CustomerDto): Promise<CustomerEntity> {
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
  }
  
  async findOne(id: string): Promise<CustomerEntity> {
    const customer = await this.iCustomerEntity.findOne({where: {idCustomer: id}});
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    return customer;
  }
  
  async find(): Promise<CustomerEntity[]> {
    return await this.iCustomerEntity.find();
  }
  
  async delete(id: string): Promise<void> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    await this.userService.delete(customer.user.idUser);
    await this.iCustomerEntity.delete(id);
  }
  
  async findByEmail(email: string): Promise<CustomerEntity> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    const customer = await this.iCustomerEntity.findOne({ where: { idCustomer: user.idUser } });
    if (!customer) {
      throw new Error(`Customer with user ID ${user.idUser} not found`);
    }
    return customer;
  }
  
  async findById(id: string): Promise<CustomerEntity> {
    const customer = await this.iCustomerEntity.findOne({ where: { idCustomer: id } });
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    return customer;
  }
}