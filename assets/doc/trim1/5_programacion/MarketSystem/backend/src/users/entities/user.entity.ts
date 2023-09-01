import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id_users: number;

  @Column({ type: 'varchar', length: 100 })
  names: string;

  @Column({ type: 'varchar', length: 100 })
  mail: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @OneToOne(() => Owner, (owner) => owner.user, { eager: true })
  owner: Owner;

  @OneToMany(() => Customer, (customer) => customer.user)
  customer: Customer[];
}
