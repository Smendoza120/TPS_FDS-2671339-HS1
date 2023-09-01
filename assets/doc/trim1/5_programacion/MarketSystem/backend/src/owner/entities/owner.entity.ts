import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
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
  @JoinColumn()
  user: User;

  @OneToMany(() => Permissions, (permissions) => permissions.owner)
  permissions: Permissions[];
}
