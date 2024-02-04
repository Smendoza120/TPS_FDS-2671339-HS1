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
    
    const customer = new CustomerEntity();
    customer.user = user; 
    
    await this.iCustomerEntity.save(customer);
    
    return customer;
  }
  
  async update(id: string, dto: CustomerDto): Promise<CustomerEntity> {
    const customer = await this.findOne(id);
    const user = await this.userService.getUserById(dto.userId);
    
    customer.user = user;
    
    await this.iCustomerEntity.save(customer);
    
    return customer;
  }
  
  async findOne(id: string): Promise<CustomerEntity> {
    return await this.iCustomerEntity.findOneOrFail({where: {idCustomer: id}});
  }
  
  async find(): Promise<CustomerEntity[]> {
    return await this.iCustomerEntity.find();
  }
  
  async delete(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.userService.delete(customer.user.idUser);
    await this.iCustomerEntity.delete(id);
  }
  
  async findByEmail(email: string): Promise<CustomerEntity> {
    const user = await this.userService.getUserByEmail(email);
    return await this.iCustomerEntity.findOne({ where: { idCustomer: user.idUser } });
  }
  
  async findById(id: string): Promise<CustomerEntity> {
    const user = await this.userService.getUserById(id);
    return await this.iCustomerEntity.findOne({ where: { idCustomer: user.idUser } });
  }
}
