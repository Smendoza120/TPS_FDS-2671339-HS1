import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReportsSalesEntity } from '../entities/reports.entity';
import { SalesService } from './sales.service';

@Injectable()
export class ReportService {
  constructor(
    @Inject('REPORT_SALES_REPOSITORY')
    private iReportsSalesEntity: Repository<ReportsSalesEntity>,
    private salesService: SalesService,
  ) {}

  async createDailyReport(date: string): Promise<ReportsSalesEntity> {
    // Convert the date string to a Date object
    const reportDate = new Date(date);
    reportDate.setHours(0, 0, 0, 0);

    // Generate the sales report for the day
    const salesReport = await this.salesService.generateDailyReport(reportDate);

    // Create a new report and add the sales to it
    const report = new ReportsSalesEntity();
    report.sales = [salesReport]; // Wrap salesReport in an array

    // Save the report in the database
    await this.iReportsSalesEntity.save(report);

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
