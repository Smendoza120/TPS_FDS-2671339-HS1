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
    try {
      // Split the date string into components
      const [year, month, day] = date.split('-').map(Number);
  
      // Create a new Date object with Date.UTC
      const reportDate = new Date(Date.UTC(year, month - 1, day));
  
      // Create an endDate that is the end of reportDate
      const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));
  
      // Find all sales for the given date
      const salesForDate = await this.salesService.findSalesByDate(reportDate, endDate);
  
      // Create a new report and add the sales to it
      const report = new ReportsSalesEntity();
      report.date = date; // Assign the date to the report
      report.sales = salesForDate;
  
      // Save the report in the database
      await this.iReportsSalesEntity.save(report);
  
      return report;
    } catch (error) {
      throw new Error(`Failed to create daily report: ${error.message}`);
    }
  }

  async getReport(id: string): Promise<ReportsSalesEntity> {
    try {
      return this.iReportsSalesEntity.findOne({ 
        where: { idReportSales: id },
        relations: ['sales', 'sales.product'] 
      });
    } catch (error) {
      throw new Error(`Failed to get report: ${error.message}`);
    }
  }

  async getAllReports(): Promise<ReportsSalesEntity[]> {
    try {
      return this.iReportsSalesEntity.find({ relations: ['sales', 'sales.product'] });
    } catch (error) {
      throw new Error(`Failed to get all reports: ${error.message}`);
    }
  }
  
  async updateReport(
    id: string,
    report: ReportsSalesEntity,
  ): Promise<ReportsSalesEntity> {
    try {
      await this.iReportsSalesEntity.update(id, report);
      return this.iReportsSalesEntity.findOne({ where: { idReportSales: id } });
    } catch (error) {
      throw new Error(`Failed to update report: ${error.message}`);
    }
  }

  async deleteReport(id: string): Promise<void> {
    try {
      await this.iReportsSalesEntity.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete report: ${error.message}`);
    }
  }
}
