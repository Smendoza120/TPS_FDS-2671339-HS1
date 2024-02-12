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
      dto.salesDate = new Date(dto.salesDate).toISOString(); // Convierte salesDate a una cadena en formato ISO
      const sale = this.salesRepository.create(dto);
    
      const customer = await this.iCustomerService.findById(dto.customerId);
      if (!customer) {
        throw new Error(`Customer with ID ${dto.customerId} not found`);
      }
      sale.customer = customer;
  
      // Inicializa sale.products si es undefined
      if (!sale.products) {
        sale.products = [];
      }

      // Busca cada producto por su ID y agrégalo a la venta
      for (const productId of dto.productIds) {
        const product = await this.iProductService.findById(productId);
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }
        if (product.quantity < dto.quantity) {
          throw new Error('Not enough products in the inventory for the sale');
        }
        sale.products.push(product);
        await this.iProductService.updateQuantity(productId, dto.quantity);
      }
  
      await this.salesRepository.save(sale);
  
      return sale;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'There was a problem with your request',
        message: error.message, // Include the original error message
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
    // Obtén la fecha del día siguiente
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
  
    // Convierte las fechas a cadenas en formato YYYY-MM-DD
    const dateString = date.toISOString().split('T')[0];
    const nextDateString = nextDate.toISOString().split('T')[0];
  
    // Obtén todas las ventas del día
    const sales = await this.salesRepository.find({
      where: {
        salesDate: Between(dateString, nextDateString),
      },
      relations: ['products'], // Asegúrate de cargar los productos relacionados
    });
  
    // Inicializa el total y el objeto de reporte
    let total = 0;
    const report: any = {};
  
    // Itera sobre cada venta
    for (const sale of sales) {
      // Itera sobre cada producto en la venta
      for (const product of sale.products) {
        // Busca el producto usando el servicio ProductService
        const productDetails = await this.iProductService.findById(product.idProduct);
  
        // Si el producto ya está en el reporte, incrementa la cantidad y suma al total
        if (report[product.idProduct]) {
          report[product.idProduct].quantity += sale.quantity;
          report[product.idProduct].total += sale.quantity * productDetails.price;
        } else {
          // Si el producto no está en el reporte, añádelo
          report[product.idProduct] = {
            product: productDetails.productName,
            quantity: sale.quantity,
            price: productDetails.price,
            total: sale.quantity * productDetails.price,
          };
        }
  
        // Suma al total general
        total += sale.quantity * productDetails.price;
      }
    }
  
    // Añade el total al reporte
    report.total = total;
  
    return report;
  }

  async getSalesByDate(date: Date): Promise<SalesEntity[]> {
    // Obtén la fecha del día siguiente
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    // Convierte las fechas a cadenas en formato YYYY-MM-DD
    const dateString = date.toISOString().split('T')[0];
    const nextDateString = nextDate.toISOString().split('T')[0];

    // Obtén todas las ventas del día
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
}