import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BillsEntity } from '../entities/bills.entity';
import { SalesService } from './sales.service';
import { SalesEntity } from '../entities/sales.entity';
import { ProductsEntity } from '../entities/products.entity';
import { CustomerService } from './customer.service';
import { CreateBillDto } from '../dto/bills.dto';

@Injectable()
export class BillsService {
  constructor(
    @Inject('BILLS_REPOSITORY')
    private billsRepository: Repository<BillsEntity>,
    @Inject('SALES_REPOSITORY')
    private salesRepository: Repository<SalesEntity>,
    private salesService: SalesService,
    private iCustomerService: CustomerService,
  ) {}

  async createBillForCustomerOnDate(
    createBillDto: CreateBillDto,
  ): Promise<BillsEntity> {
    const { customerId, date } = createBillDto;
    // Get the sales report for the customer on the date
    const report = await this.salesService.getSalesForCustomerOnDate(
      customerId,
      date,
    );
  
    // If the total is 0, then the customer didn't buy anything on the date
    if (report.total === 0) {
      throw new Error('The customer did not buy anything on the given date');
    }
  
    // Get the sales for the customer on the date
    const customerEntity = await this.iCustomerService.findOne(customerId);
    const sales = await this.salesRepository.find({
      where: {
        customer: customerEntity,
        salesDate: date,
      },
      relations: ['product'], // Changed 'products' to 'product'
    });
  
    if (!sales.length) {
      throw new Error('Sales not found for the given customer and date');
    }
  
    // Create a new bill
    const bill = new BillsEntity();
    bill.sales = sales;
    bill.date = date;
    bill.total = sales.reduce((total, sale) => total + sale.quantity * sale.product.price, 0);
  
    // Save the bill to the database
    await this.billsRepository.save(bill);
  
    return bill;
  }

  async findBillById(id: string, options?: any): Promise<BillsEntity> {
    const bill = await this.billsRepository.findOne({ where: { idBills: id }, ...options });
    if (!bill) {
      throw new Error('Bill not found');
    }
    return bill;
  }

  async getProductsByCustomerAndDate(customerId: string, date: string): Promise<{product: ProductsEntity, quantity: number}[]> {
    const customerEntity = await this.iCustomerService.findOne(customerId);
    const sales = await this.salesRepository.find({
      where: {
        customer: customerEntity,
        salesDate: date,
      },
      relations: ['product'], // Changed 'productSales' to 'product'
    });

    if (!sales.length) {
      throw new Error('Sales not found for the given customer and date');
    }

    // Collect all products from the sales and their quantities
    let products: {product: ProductsEntity, quantity: number}[] = [];
    sales.forEach(sale => {
      const product = sale.product; // Changed 'productSales' to 'product'
      const productIndex = products.findIndex(p => p.product.idProduct === product.idProduct);
      if (productIndex !== -1) {
        products[productIndex].quantity += sale.quantity;
      } else {
        products.push({product: product, quantity: sale.quantity});
      }
    });

    return products;
  }

  async getSalesByCustomerAndDate(customerId: string, date: string): Promise<SalesEntity[]> {
    const customerEntity = await this.iCustomerService.findOne(customerId);
    const sales = await this.salesRepository.find({
      where: {
        customer: customerEntity,
        salesDate: date,
      },
      relations: ['product'],
    });
  
    if (!sales.length) {
      throw new Error('Sales not found for the given customer and date');
    }
  
    return sales;
  }
}