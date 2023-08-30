import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Customer } from "./customer.entity";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>
  ) {}

  async createCustomer(data: CreateCustomerDto) {
    const newCustomer = new Customer();

    if (data.id_users) {
      const user = await this.userRepository.findOne({
        where: { id_user: data.id_users },
      });

      if (user) {
        newCustomer.user = user;
      }
    }

    return this.customerRepository.save(newCustomer);
  }

  getAllCustomers() {
    return this.customerRepository.find();
  }

  getCustomer(id: number) {
    return this.customerRepository.findOne({
      where: {
        id_customer: id,
      },
    });
  }

  // updateCustomer(id: number, customer: UpdateCustomerDto) {
  //   return this.customerRepository.update(id, customer);
  // }

  deleteCustomer(id: number) {
    return this.customerRepository.delete(id);
  }
}
