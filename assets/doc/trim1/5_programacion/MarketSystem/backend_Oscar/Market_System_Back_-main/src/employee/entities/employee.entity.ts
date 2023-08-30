import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Permissions } from 'src/permissions/entities/permission.entity';

@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn()
  id_employee: number;

  @Column({ type: 'varchar', length: 50 })
  position: string;

  @OneToMany(() => Permissions, (permissions) => permissions.employee)
  permissions: Permissions[];
}
