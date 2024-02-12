import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

import { Exclude } from 'class-transformer';

@Entity({ name: 'owner' })
export class Owner {
  @PrimaryGeneratedColumn()
  id_owner: number;

  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @Column({ type: 'boolean' })
  permission_sales: boolean;

  @Column({ type: 'boolean' })
  permission_users: boolean;

  @Column({ type: 'boolean' })
  permission_inventories: boolean;

  @Column({ type: 'boolean' })
  permission_bill: boolean;

  @OneToOne(() => User, (user) => user.owner)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
