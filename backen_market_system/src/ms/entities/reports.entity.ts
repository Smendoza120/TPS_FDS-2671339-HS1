import {
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs
import { SalesEntity } from './sales.entity';

@Entity({ name: 'reports_sales' })
export class ReportsSalesEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id_report_sales',
  })
  idReportSales: string;

  @BeforeInsert()
  addId() {
    // Genera un UUID utilizando uuidv4 y lo asigna a idUser
    this.idReportSales = uuidv4();
  }

  @OneToMany(() => SalesEntity, (sale) => sale.report)
  sales: SalesEntity[];
}
