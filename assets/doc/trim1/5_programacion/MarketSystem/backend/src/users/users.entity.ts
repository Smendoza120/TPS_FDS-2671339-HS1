/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Owner } from "src/owner/owner.entity";

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn("increment")
  id_user: number;

  @Column()
  names: string;

  @Column()
  mail: string;

  @Column()
  phone: string;

  // @JoinColumn()
  @OneToOne(() => Users)
  owner: Owner;
  // userFound: Owner;
}
