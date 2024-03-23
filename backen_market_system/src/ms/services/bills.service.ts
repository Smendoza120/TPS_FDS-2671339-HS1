import { Injectable, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
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

  async createBillForCustomerAndSalesOnDate(
    createBillDto: CreateBillDto,
  ): Promise<BillsEntity> {
    try {
      const { customerId, salesIds, date } = createBillDto;
  
      const customer = await this.iCustomerService.findOne(customerId);
      if (!customer) {
        throw new Error('Cliente no encontrado');
      }
  
      const sales = await this.salesRepository.find({
        where: {
          idSales: In(salesIds), // usa el nombre correcto de la columna aquí
          salesDate: date,
        },
        relations: ['product'],
      });
  
      if (!sales.length) {
        throw new Error('No se encontraron ventas para los ID de ventas y la fecha dados');
      }
  
      const bill = new BillsEntity();
      bill.sales = sales;
      bill.date = date;
      bill.customer = customer; // Include the customer in the bill
      bill.total = sales.reduce((total, sale) => total + sale.quantity * sale.product.price, 0);
  
      await this.billsRepository.save(bill);
  
      return bill;
    } catch (error) {
      throw new Error(`Error al crear la factura: ${error.message}`);
    }
  }

  async findBillById(id: string, options?: any): Promise<BillsEntity> {
    try {
      const bill = await this.billsRepository.findOne({ where: { idBills: id }, ...options });
      if (!bill) {
        throw new Error('Bill not found');
      }
      return bill;
    } catch (error) {
      throw new Error(`Failed to find bill: ${error.message}`);
    }
  }

  async getProductsByCustomerAndDate(customerId: string, date: string): Promise<{product: ProductsEntity, quantity: number}[]> {
    try {
      const customerEntity = await this.iCustomerService.findOne(customerId);
      const bills = await this.billsRepository.find({
        where: {
          customer: customerEntity,
          date: date,
        },
        relations: ['sales', 'sales.product'],
      });
  
      if (!bills.length) {
        throw new Error('Bills not found for the given customer and date');
      }
  
      let products: {product: ProductsEntity, quantity: number}[] = [];
      bills.forEach(bill => {
        bill.sales.forEach(sale => {
          const product = sale.product;
          const productIndex = products.findIndex(p => p.product.idProduct === product.idProduct);
          if (productIndex !== -1) {
            products[productIndex].quantity += sale.quantity;
          } else {
            products.push({product: product, quantity: sale.quantity});
          }
        });
      });
  
      return products;
    } catch (error) {
      throw new Error(`Failed to get products: ${error.message}`);
    }
  }

  async getSalesByCustomerAndDate(customerId: string, date: string): Promise<SalesEntity[]> {
    try {
      const customerEntity = await this.iCustomerService.findOne(customerId);
      const sales = await this.salesRepository.find({
        where: {
          // customer: customerEntity,
          salesDate: date,
        },
        relations: ['product'],
      });
  
      if (!sales.length) {
        throw new Error('Sales not found for the given customer and date');
      }
  
      return sales;
    } catch (error) {
      throw new Error(`Failed to get sales: ${error.message}`);
    }
  }

  async getAllBills(): Promise<BillsEntity[]> {
    return this.billsRepository.find();
  }
  
  async updateBill(id: string, bill: Partial<BillsEntity>): Promise<BillsEntity> {
    await this.billsRepository.update(id, bill);
    return this.findBillById(id);
  }
  
  async deleteBill(id: string): Promise<void> {
    await this.billsRepository.delete(id);
  }
}