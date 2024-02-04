import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column, IntegerType, OneToMany, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs
import { ProductsEntity } from "./products.entity";

@Entity({name: 'inventory'})
export class InventoryEntitie {
    @PrimaryGeneratedColumn('uuid',{
        name: 'id_inventory',
    })
    idInventory: string;

    @Column({
        type: 'int',
        name: 'queantity'
    })
    queantity: number

    @Column({
        type: 'varchar',
        length: 255,
        name: 'storage'
    })
    storage: string

    @OneToMany(() => ProductsEntity, product => product.inventory)
    @JoinColumn({
        name: 'id_product',
    })
    products: ProductsEntity[]; // Esta es la propiedad que contendrá la lista de productos asociados a este inventario


    @BeforeInsert()
    addId() {
    this.idInventory = uuidv4();
  }
}