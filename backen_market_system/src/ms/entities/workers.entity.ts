import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs
import { Exclude } from 'class-transformer';

@Entity({ name: 'workers' })
export class WorkerEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id_worker',
  })
  idWorker: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'boolean',
    name: 'sales_permission',
    default: false,
  })
  salesPermission: boolean;

  @Column({
    type: 'boolean',
    name: 'inventory_permission',
    default: false,
  })
  inventoryPermission: boolean;

  @Column({
    type: 'boolean',
    name: 'users_permission',
    default: false,
  })
  usersPermission: boolean;

  @Column({
    type: 'boolean',
    name: 'bills_permission',
    default: false,
  })
  billsPermission: boolean;

  @OneToOne(() => UserEntity, { cascade: true, eager: true })
  @JoinColumn({
    name: 'id_user',
  })
  user: UserEntity;

  @BeforeInsert()
  addId() {
    // Genera un UUID utilizando uuidv4 y lo asigna a idUser
    this.idWorker = uuidv4();
  }

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @Column({ nullable: true, name: 'password_reset_token' })
  passwordResetToken: string;

  @Column({ nullable: true, name: 'password_reset_expires' })
  passwordResetExpires: Date;
}
