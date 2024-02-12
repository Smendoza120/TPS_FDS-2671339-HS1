import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';
import { Sales } from 'src/sales/entities/sales.entity';

@Entity({ name: 'bill' })
export class Bill {
  @PrimaryGeneratedColumn()
  id_bill: number;

  @Column()
  creation_date: Date;

  @OneToMany(() => Sales, (sales) => sales.bill)
  sales: Sales[];
}
