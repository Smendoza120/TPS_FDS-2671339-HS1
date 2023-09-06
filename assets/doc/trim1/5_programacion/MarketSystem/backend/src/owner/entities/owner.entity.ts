import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Permissions } from 'src/permissions/entities/permission.entity';

import { Exclude } from 'class-transformer';

@Entity({ name: 'owner' })
export class Owner {
  @PrimaryGeneratedColumn()
  id_owner: number;

  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToOne(() => User, (user) => user.owner)
  @JoinColumn({ name: 'id_users' })
  user: User;

  @OneToMany(() => Permissions, (permissions) => permissions.owner)
  permissions: Permissions[];
}
