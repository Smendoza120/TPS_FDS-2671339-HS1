import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { TempSalesEntity } from '../entities/TempSales.entity';
import { SalesDto } from '../dto/sales-dto';
import { UpdateTempSalesDto } from '../dto/update-temp.dto'
import { InventoryService } from './invenotory.service';
import { CustomerService } from './customer.service';
import { ProductService } from './products.service';
import { ReportsSalesEntity } from '../entities/reports.entity';
import { SalesEntity } from '../entities/sales.entity';
import { SalesService } from './sales.service';

@Injectable()
export class TempSalesService { // Change the service name
  constructor(
    @Inject('TEMPSALES_REPOSITORY')
    private tempSalesRepository: Repository<TempSalesEntity>, // Use the temp sales repository
    @Inject('REPORT_SALES_REPOSITORY')
    private reportsSalesEntity: Repository<ReportsSalesEntity>,
    private iInventoryService: InventoryService,
    private iCustomerService: CustomerService,
    private iProductService: ProductService,
    private salesService: SalesService,
  ) { }

  async create(dto: SalesDto): Promise<TempSalesEntity> {
    try {
      dto.salesDate = new Date(dto.salesDate).toISOString();
      const sale = this.tempSalesRepository.create(dto);
  
      const product = await this.iProductService.findById(dto.productId);
      if (!product) {
        throw new Error(`Product with ID ${dto.productId} not found`);
      }
      if (product.quantity < dto.quantity) {
        throw new Error('Not enough products in the inventory for the sale');
      }
      sale.product = product;
      sale.quantity = dto.quantity;
  
      await this.tempSalesRepository.save(sale);
  
      return sale;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with your request',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, dto: UpdateTempSalesDto): Promise<TempSalesEntity> {
    try {
      const sale = await this.tempSalesRepository.findOne({ where: { idSales: id } });
      if (!sale) {
        throw new Error(`Sale with ID ${id} not found`);
      }
  
      if (dto.productId) {
        const product = await this.iProductService.findById(dto.productId);
        if (!product) {
          throw new Error(`Product with ID ${dto.productId} not found`);
        }
        if (product.quantity < dto.quantity) {
          throw new Error('Not enough products in the inventory for the sale');
        }
        sale.product = product;
      }
  
      if (dto.quantity) {
        sale.quantity = dto.quantity;
      }
  
      if (dto.salesDate) {
        sale.salesDate = new Date(dto.salesDate).toISOString();
      }
  
      await this.tempSalesRepository.save(sale);
  
      return sale;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with your request',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<void> {
    const sale = await this.tempSalesRepository.findOne({ where: { idSales: id } });
    if (!sale) {
      throw new Error(`Sale with ID ${id} not found`);
    }
    await this.tempSalesRepository.remove(sale);
  }

  async findAll(): Promise<TempSalesEntity[]> {
    try {
      const sales = await this.tempSalesRepository.find();
      return sales;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with your request',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async findOne(id: string): Promise<TempSalesEntity> {
    try {
      const sale = await this.tempSalesRepository.findOne({ where: { idSales: id } });
      if (!sale) {
        throw new Error(`Sale with ID ${id} not found`);
      }
      return sale;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'There was a problem with your request',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async confirmSale(): Promise<SalesEntity[]> {
    const tempSales = await this.tempSalesRepository.find();
    
    const salesDtos: SalesDto[] = tempSales.map(tempSale => ({
      productId: tempSale.product.idProduct,
      quantity: tempSale.quantity,
      salesDate: tempSale.salesDate,
    }));
    
    const savedSales = await this.salesService.create(salesDtos);
    
    for (const tempSale of tempSales) {
      await this.tempSalesRepository.remove(tempSale);
    }
    
    return savedSales;
  }
}