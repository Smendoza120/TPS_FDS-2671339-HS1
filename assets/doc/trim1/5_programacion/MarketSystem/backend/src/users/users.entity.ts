import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Owner } from 'src/owner/owner.entity';

@Entity({ name: 'user' })
export class Users {
  @PrimaryGeneratedColumn()
  id_user: number;

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

  @OneToOne(() => Owner, { cascade: true })
  // @JoinColumn()
  owner: Owner;
  // userFound: Owner;
}
