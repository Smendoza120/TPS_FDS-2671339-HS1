// En SalesEntity
import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ProductsEntity } from "./products.entity";
import { CustomerEntity } from './customers.entity';
import { ReportsSalesEntity } from './reports.entity';
import { BillsEntity } from './bills.entity'

@Entity({name: 'sales'})
export class SalesEntity {
    @PrimaryGeneratedColumn('uuid',{
        name: 'id_sales',
    })
    idSales: string;

    @Column({
        type: 'int',
        name: 'queantity'
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

    @ManyToMany(() => ProductsEntity)
    @JoinTable()
    products: ProductsEntity[]

    @BeforeInsert()
    addId() {
    this.idSales = uuidv4();
  }
}