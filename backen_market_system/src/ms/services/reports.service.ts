import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReportsSalesEntity } from '../entities/reports.entity';
import { SalesEntity } from '../entities/sales.entity';
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
    const salesReportData = await this.salesService.generateDailyReport(reportDate);
  
    // Create a SalesEntity object
    const salesEntity = new SalesEntity();
    salesEntity.quantity = salesReportData.quantity;
    // set other properties...
  
    // Save the sales in the database
    const savedSales = await this.salesService.saveSales(salesEntity);
  
    // Create a new report and add the sales to it
    const report = new ReportsSalesEntity();
    report.date = reportDate.toISOString().split('T')[0]; // Assign the date to the report
    report.sales = [savedSales]; // Wrap savedSales in an array
  
    // Save the report in the database
    await this.iReportsSalesEntity.save(report);
  
    return report;
  }

async getReport(id: string): Promise<ReportsSalesEntity> {
  return this.iReportsSalesEntity.findOne({ 
    where: { idReportSales: id },
    relations: ['sales', 'sales.products'] 
  });
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
