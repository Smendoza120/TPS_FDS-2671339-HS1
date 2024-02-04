import { Injectable, Inject } from '@nestjs/common';
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
    const sale = this.salesRepository.create(dto);
    const customer = await this.iCustomerService.findById(dto.customerId);
    sale.customers = customer;

    // Busca cada producto por su ID y agrégalo a la venta
    for (const productId of dto.productIds) {
      const product = await this.iProductService.findById(productId);
      sale.products.push(product);
    }

    await this.salesRepository.save(sale);

    // Update the inventory
    for (const product of sale.products) {
      await this.iInventoryService.decreaseQuantity(product.inventory.idInventory, sale.quantity);
    }

    return sale;
  }

  async update(id: string, dto: SalesDto): Promise<SalesEntity> {
    const sale = await this.salesRepository.findOneOrFail({where: {idSales: id}});
    Object.assign(sale, dto);
    await this.salesRepository.save(sale);
    return sale;
  }

  async find(): Promise<SalesEntity[]> {
    return await this.salesRepository.find({ relations: ["products", "customers"] });
  }

  async findById(id: string): Promise<SalesEntity> {
    return await this.salesRepository.findOneOrFail({where: {idSales: id}, relations: ["products", "customers"]});
  }

  async delete(id: string): Promise<void> {
    const sale = await this.salesRepository.findOneOrFail({where: {idSales: id}});
    await this.salesRepository.remove(sale);
  }
}