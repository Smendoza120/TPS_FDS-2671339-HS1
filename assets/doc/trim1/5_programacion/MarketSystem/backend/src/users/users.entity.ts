/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { Owner } from "src/owner/owner.entity";
import { Customer } from "src/customer/customer.entity";
// import {} from 'src/'

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn("increment")
  id_user: number;

  @Column()
  names: string;

  @Column()
  mail: string;

  @Column()
  phone: string;

  @OneToOne(() => Users)
  owner: Owner;

  @OneToMany(() => Customer, (customer) => customer.id_customer)
  customer: Customer;
}
