import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';

@Entity({ name: 'workers' })
export class WorkerEntity {
  @PrimaryGeneratedColumn({
    name: 'id_worker',
  })
  idWorker: string;

  @Column({
    name: 'password',
  })
  password: string;

  @Column({
    name: 'sales_permission',
  })
  salesPermission: boolean;

  @Column({
    name: 'inventory_permission',
  })
  inventoryPermission: boolean;

  @Column({
    name: 'users_permission',
  })
  usersPermission: boolean;

  @Column({
    name: 'bills_permission',
  })
  billsPermission: boolean;

  @OneToOne(() => UserEntity, { cascade: true, eager: true })
  @JoinColumn({
    name: 'id_user',
  })
  user: UserEntity;
}
