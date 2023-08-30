import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "src/users/users.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id_customer: number;

  @ManyToOne(() => Users, (user) => user.id_user)
  @JoinColumn({ name: "id_user" })
  user: Users;
}
