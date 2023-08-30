import { PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Sales } from 'src/sales/entities/sales.entity';

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn()
  id_customer: number;

  @ManyToOne(() => User, (user) => user.customer)
  user: User;

  @OneToMany(() => Sales, (sales) => sales.customer)
  sales: Sales[];
}
