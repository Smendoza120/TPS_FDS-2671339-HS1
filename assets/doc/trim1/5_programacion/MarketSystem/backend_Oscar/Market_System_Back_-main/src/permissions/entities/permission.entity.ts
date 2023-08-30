import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Owner } from 'src/owner/entities/owner.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Entity({ name: 'permissions' })
export class Permissions {
  @PrimaryGeneratedColumn()
  id_permissions: number;

  @Column({ type: 'tinyint' })
  permission_sales: boolean;

  @Column({ type: 'tinyint' })
  permission_users: boolean;

  @Column({ type: 'tinyint' })
  permission_inventories: boolean;

  @Column({ type: 'tinyint' })
  permission_bill: boolean;

  @ManyToOne(() => Owner, (owner) => owner.permissions)
  owner: Owner;

  @ManyToOne(() => Employee, (employee) => employee.permissions)
  employee: Employee;
}
