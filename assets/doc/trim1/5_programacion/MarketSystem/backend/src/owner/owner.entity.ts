import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Users } from 'src/users/users.entity';

@Entity({ name: 'owner' })
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToOne(() => Users, (user) => user.id_user)
  @JoinColumn({name: "id_user"})
  user: Users;
}
