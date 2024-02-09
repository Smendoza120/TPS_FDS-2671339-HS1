import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs
import { UserEntity } from './users.entity';
import { SalesEntity } from './sales.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid',{
    name: 'id_customer',
  })
  idCustomer: string;

  @BeforeInsert()
  addId() {
    // Genera un UUID utilizando uuidv4 y lo asigna a idUser
    this.idCustomer = uuidv4();
  }

  @OneToOne(() => SalesEntity, sale => sale.customers)
  sale: SalesEntity;

  @OneToOne(() => UserEntity, { cascade: true, eager: true })
  @JoinColumn({
    name: 'id_user',
  })
  user: UserEntity;
}
