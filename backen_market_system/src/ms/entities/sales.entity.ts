import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs
import { ProductsEntity } from "./products.entity";
import { CustomerEntity } from './customers.entity';

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
    salesDate: Date;

    @OneToMany(() => ProductsEntity, product => product.sale)
    products: ProductsEntity[];

    @OneToOne(() => CustomerEntity, { cascade: true, eager: true })
    @JoinColumn({
      name: 'id_customer',
    })
    customers: CustomerEntity;

    @BeforeInsert()
    addId() {
    this.idSales = uuidv4();
  }
}