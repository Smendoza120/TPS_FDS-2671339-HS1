import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs
import { InventoryEntitie } from './inventory.entity';

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
    type: 'int',
    name: 'quantity'
  })
  quantity: number;

  @Column({
    type: 'date',
    name: 'purchase_date'
  })
  purchaseDate: string;

  @ManyToOne(() => InventoryEntitie, inventory => inventory.products)
  @JoinColumn({ name: 'inventory_id' }) // Esta es la columna de clave foránea
  inventory: InventoryEntitie;

  @Column({ type: 'uuid' }) // Asegúrate de que el tipo de la columna coincida con el tipo de la clave primaria de InventoryEntitie
  inventory_id: string; // Esta es la columna de clave foránea


  @BeforeInsert()
  addId() {
    // Genera un UUID utilizando uuidv4 y lo asigna a idUser
    this.idProduct = uuidv4();
  }
}
