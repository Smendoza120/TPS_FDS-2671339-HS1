import {
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  Column
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs
import { SalesEntity } from './sales.entity';

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
      // Genera un UUID utilizando uuidv4 y lo asigna a idUser
      this.idBills = uuidv4();
  }

  @OneToMany(() => SalesEntity, (sale) => sale.bills)
  sales: SalesEntity[];
}