import {
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  Column,
  ManyToOne
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SalesEntity } from './sales.entity';
import { CustomerEntity } from './customers.entity'; // Asegúrate de que este es el nombre correcto de tu entidad de clientes

@Entity({ name: 'bills' })
export class BillsEntity {
  @PrimaryGeneratedColumn('uuid', {
      name: 'id_biils',
  })
  idBills: string;

  @Column({
      type: 'date',
      name: 'date'
  })
  date: string;

  @Column({
      type: 'decimal',
      name: 'total'
  })
  total: number;

  @BeforeInsert()
  addId() {
      this.idBills = uuidv4();
  }

  @ManyToOne(() => CustomerEntity, customer => customer.bills)
customer: CustomerEntity;

  @OneToMany(() => SalesEntity, (sale) => sale.bills)
  sales: SalesEntity[];
}