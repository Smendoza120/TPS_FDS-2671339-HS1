import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { Bill } from 'src/bills/entities/bill.entity';

@Entity({ name: 'sales' })
export class Sales {
  @PrimaryGeneratedColumn()
  id_sales: number;

  @Column({ type: 'int' })
  quantity_sold: number;

  @Column({ type: 'varchar', length: 100 })
  names_customer: string;

  @Column({ type: 'varchar', length: 100 })
  product_sold: string;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  customer: Customer;

  @ManyToOne(() => Inventory, (inventory) => inventory.sales)
  inventory: Inventory;

  @ManyToOne(() => Bill, (bill) => bill.sales)
  bill: Bill;
}
