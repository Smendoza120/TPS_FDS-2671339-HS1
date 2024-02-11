import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SalesEntity } from '../entities/sales.entity';
import { SalesDto } from '../dto/sales-dto';
import { InventoryService } from './invenotory.service';
import { CustomerService } from './customer.service';
import { ProductService } from './products.service';
@Injectable()
export class SalesService {
  constructor(
    @Inject('SALES_REPOSITORY')
    private salesRepository: Repository<SalesEntity>,
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
      sale.customers = customer;
  
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
    return await this.salesRepository.find({ relations: ["products", "customers"] });
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
}