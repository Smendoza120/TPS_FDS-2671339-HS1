// En SalesEntity
import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProductsEntity } from "./products.entity";
import { CustomerEntity } from './customers.entity';
import { ReportsSalesEntity } from './reports.entity';
import { BillsEntity } from './bills.entity'
import { IsOptional } from 'class-validator';

@Entity({name: 'sales'})
export class SalesEntity {
    @PrimaryGeneratedColumn('uuid',{
        name: 'id_sales',
    })
    idSales: string;

    @Column({
        type: 'int',
        name: 'quantity'
    })
    quantity : number

    @Column({
        type: 'date',
        name: 'sales_date'
    })
    salesDate: string;

    @ManyToOne(() => CustomerEntity, customer => customer.sales, { cascade: true, eager: true })
    customer: CustomerEntity;

    @ManyToOne(() => ReportsSalesEntity, report => report.sales, { cascade: true, eager: true })
    report: ReportsSalesEntity;

    @ManyToOne(() => BillsEntity, bills => bills.sales, { cascade: true, eager: true })
    bills: BillsEntity;

    @ManyToOne(() => ProductsEntity, product => product.sales, { cascade: true, eager: true })
    product: ProductsEntity;

    @BeforeInsert()
    addId() {
    this.idSales = uuidv4();
  }
}