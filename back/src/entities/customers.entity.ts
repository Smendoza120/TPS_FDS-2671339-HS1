import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './users.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn({
    name: 'id_customer',
  })
  idCustomer: string;

  @OneToOne(() => UserEntity, { cascade: true, eager: true })
  @JoinColumn({
    name: 'id_user',
  })
  user: UserEntity;
}
