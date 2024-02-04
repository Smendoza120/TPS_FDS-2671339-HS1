import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column, ManyToOne } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs
import { InventoryEntitie } from './inventory.entity';
import { SalesEntity } from './sales.entity';

@Entity({ name: 'products' })
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid',{
    name: 'id_product',
  })
  idProduct: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'product_name',
  })
  productName: string;

  @Column({
    type: 'int',
    name: 'price',
  })
  price: number;

  @Column({
    type: 'date',
    name: 'due_date'
  })
  dueDate: Date;

  @Column({
    type: 'date',
    name: 'purchase_date'
  })
  purchaseDate: Date;

  @ManyToOne(() => InventoryEntitie, inventory => inventory.products) // Define la relación de muchos a uno con Inventory
  inventory: InventoryEntitie; // Esta es la propiedad que contendrá la referencia al objeto Inventory asociado

  @ManyToOne(() => SalesEntity, sale => sale.products)
  sale: SalesEntity;

  @BeforeInsert()
  addId() {
    // Genera un UUID utilizando uuidv4 y lo asigna a idUser
    this.idProduct = uuidv4();
  }
}
