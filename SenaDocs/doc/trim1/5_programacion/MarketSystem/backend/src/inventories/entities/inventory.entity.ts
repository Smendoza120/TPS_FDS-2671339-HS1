import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Sales } from 'src/sales/entities/sales.entity';

@Entity({ name: 'inventory' })
export class Inventory {
  @PrimaryGeneratedColumn()
  id_inventory: number;

  @Column({ type: 'varchar', length: 45 })
  storage: string;

  @Column({ type: 'date' })
  date_purchase: Date;

  @Column({ type: 'float' })
  unit_price: number;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ type: 'varchar', length: 100 })
  product: string;

  @Column({ type: 'int' })
  quantity_products: number;

  @OneToMany(() => Sales, (sales) => sales.inventory)
  sales: Sales[];
}
