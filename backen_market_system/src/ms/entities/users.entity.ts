import { Entity, Column, PrimaryGeneratedColumn, OneToOne, BeforeInsert } from 'typeorm';
import { WorkerEntity } from './workers.entity';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid',{
    name: 'id_user',
  })
  idUser: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'phone',
  })
  phone: string;

  @BeforeInsert()
  addId() {
    // Genera un UUID utilizando uuidv4 y lo asigna a idUser
    this.idUser = uuidv4();
  }

  @OneToOne(() => WorkerEntity, (worker) => worker.user)
  worker: WorkerEntity;
}
