import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class Users {
  @PrimaryGeneratedColumn()
  id_users: number;

  @Column({
    length: 255,
    type: 'varchar',
  })
  names: string;

  @Column({
    length: 255,
    type: 'varchar',
  })
  mail: string;

  @Column({
    length: 15,
    type: 'varchar',
  })
  phone: string;
}
