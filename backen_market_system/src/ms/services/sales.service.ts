import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { SalesEntity } from '../entities/sales.entity';
import { SalesDto } from '../dto/sales-dto';
import { InventoryService } from './invenotory.service';
import { CustomerService } from './customer.service';
import { ProductService } from './products.service';
import { ReportsSalesEntity } from '../entities/reports.entity';

@Injectable()
export class SalesService {
  constructor(
    @Inject('SALES_REPOSITORY')
    private salesRepository: Repository<SalesEntity>,
    @Inject('REPORT_SALES_REPOSITORY')
    private reportsSalesEntity: Repository<ReportsSalesEntity>,
    private iInventoryService: InventoryService,
    private iCustomerService: CustomerService,
    private iProductService: ProductService,
  ) {}

  async create(dto: SalesDto): Promise<SalesEntity> {
    try {
      dto.salesDate = new Date(dto.salesDate).toISOString();
      const sale = this.salesRepository.create(dto);
  
      const customer = await this.iCustomerService.findById(dto.customerId);
      if (!customer) {
        throw new Error(`Customer with ID ${dto.customerId} not found`);
      }
      sale.customer = customer;
  
      const product = await this.iProductService.findById(dto.productId);
      if (!product) {
        throw new Error(`Product with ID ${dto.productId} not found`);
      }
      if (product.quantity < dto.quantity) {
        throw new Error('Not enough products in the inventory for the sale');
      }
      sale.product = product;
      sale.quantity = dto.quantity; // Añade esta línea para establecer la cantidad
  
      await this.iProductService.updateQuantity(dto.productId, dto.quantity);
  
      await this.salesRepository.save(sale);
  
      return sale;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'There was a problem with your request',
        message: error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, dto: SalesDto): Promise<SalesEntity> {
    const sale = await this.salesRepository.findOne({where: {idSales: id}});
    if (!sale) {
      throw new Error(`Sale with ID ${id} not found`);
    }
    Object.assign(sale, dto);
    await this.salesRepository.save(sale);
    return sale;
  }

  async find(): Promise<SalesEntity[]> {
    return await this.salesRepository.find({ relations: ["products", "customer"] });
  }

  async findById(id: string): Promise<SalesEntity> {
    const sale = await this.salesRepository.findOne({where: {idSales: id}, relations: ["products", "customers"]});
    if (!sale) {
      throw new Error(`Sale with ID ${id} not found`);
    }
    return sale;
  }

  async delete(id: string): Promise<void> {
    const sale = await this.salesRepository.findOne({where: {idSales: id}});
    if (!sale) {
      throw new Error(`Sale with ID ${id} not found`);
    }
    await this.salesRepository.remove(sale);
  }

  async generateDailyReport(date: Date): Promise<any> {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
  
    const dateString = date.toISOString().split('T')[0];
    const nextDateString = nextDate.toISOString().split('T')[0];
  
    const sales = await this.salesRepository.find({
      where: {
        salesDate: Between(dateString, nextDateString),
      },
      relations: ['product'],
    });
  
    let total = 0;
    const report: any = {};
  
    for (const sale of sales) {
      const product = sale.product;
      if (product) {
        const productDetails = await this.iProductService.findById(product.idProduct);
      
        if (report[product.idProduct]) {
          report[product.idProduct].quantity += sale.quantity;
          report[product.idProduct].total += sale.quantity * productDetails.price;
        } else {
          report[product.idProduct] = {
            product: productDetails.productName,
            quantity: sale.quantity,
            price: productDetails.price,
            total: sale.quantity * productDetails.price,
          };
        }
        total += sale.quantity * productDetails.price;
      }
    }
  
    report.total = total;
  
    return report;
  }

  async getSalesByDate(date: Date): Promise<SalesEntity[]> {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dateString = date.toISOString().split('T')[0];
    const nextDateString = nextDate.toISOString().split('T')[0];

    const sales = await this.salesRepository.find({
      where: {
        salesDate: Between(dateString, nextDateString),
      },
    });

    return sales;
  }

  async saveReport(report: ReportsSalesEntity): Promise<ReportsSalesEntity> {
    return await this.reportsSalesEntity.save(report);
  }

  async getSalesForCustomerOnDate(customerId: string, date: string): Promise<any> {
    const dateObject = new Date(date);
  
    const start = new Date(dateObject);
    start.setHours(0, 0, 0, 0);
    const startString = start.toISOString();
    
    const end = new Date(dateObject);
    end.setHours(23, 59, 59, 999);
    const endString = end.toISOString();
    
  
    const customerEntity = await this.iCustomerService.findOne(customerId);
    const sales = await this.salesRepository.find({
      where: {
        customer: customerEntity,
        salesDate: Between(startString, endString)
      },
      relations: ['product'], // Changed 'products' to 'product'
    });
  
    let total = 0;
    const report: any = {};
  
    for (const sale of sales) {
      if (sale.product) { // Check if product exists
        const product = sale.product; // Removed the inner loop over sale.products
        if (report[product.idProduct]) {
          report[product.idProduct].quantity += sale.quantity;
          report[product.idProduct].total += sale.quantity * product.price;
        } else {
          report[product.idProduct] = {
            product: product.productName,
            quantity: sale.quantity,
            price: product.price,
            total: sale.quantity * product.price,
          };
        }
  
        total += sale.quantity * product.price;
      }
    }
  
    report.total = total;
  
    return report;
  }

  async getSalesByReportId(reportId: string): Promise<SalesEntity[]> {
    const report = await this.reportsSalesEntity.findOne({where: {idReportSales: reportId}});
    if (!report) {
      throw new Error(`Report with ID ${reportId} not found`);
    }
  
    const sales = await this.salesRepository.find({
      where: {
        report: report
      },
      relations: ['product', 'customer'] // Changed 'products' to 'product'
    });
  
    return sales;
  }

  async saveSales(sale: SalesEntity): Promise<SalesEntity> {
    return await this.salesRepository.save(sale);
  }
}