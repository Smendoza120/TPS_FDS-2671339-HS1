import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReportsSalesEntity } from '../entities/reports.entity';
import { SalesService } from './sales.service';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_REPOSITORY')
    private iReportsSalesEntity: Repository<ReportsSalesEntity>,
    private salesService: SalesService,
  ) {}

  async createDailyReport(): Promise<ReportsSalesEntity> {
    // Obtén la fecha actual
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Obtén todas las ventas del día
    const sales = await this.salesService.getSalesByDate(currentDate);

    // Crea un nuevo reporte y agrega las ventas a él
    const report = new ReportsSalesEntity();
    report.sales = sales;

    // Guarda el reporte en la base de datos
    // Asume que tienes un método save en tu SalesService
    await this.salesService.saveReport(report);

    return report;
  }

  async getReport(id: string): Promise<ReportsSalesEntity> {
    return this.iReportsSalesEntity.findOne({ where: { idReportSales: id } });
  }

  async updateReport(
    id: string,
    report: ReportsSalesEntity,
  ): Promise<ReportsSalesEntity> {
    await this.iReportsSalesEntity.update(id, report);
    return this.iReportsSalesEntity.findOne({ where: { idReportSales: id } });
  }

  async deleteReport(id: string): Promise<void> {
    await this.iReportsSalesEntity.delete(id);
  }
}
