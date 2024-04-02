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
          idSales: In(salesIds), 
          salesDate: date,
        },
        relations: ['product', 'customer'],
      });
  
      if (!sales.length) {
        throw new Error('No se encontraron ventas para los ID de ventas y la fecha dados');
      }
  
      // Verificar si las ventas ya están asignadas a un cliente
      const assignedSales = sales.filter(sale => sale.customer);
      if (assignedSales.length) {
        throw new Error('Algunas ventas ya están asignadas a un cliente');
      }
  
      const bill = new BillsEntity();
      bill.sales = sales;
      bill.date = date;
      bill.customer = customer; // Include the customer in the bill
      bill.total = sales.reduce((total, sale) => total + sale.quantity * sale.product.price, 0);
  
      await this.billsRepository.save(bill);
  
      // Asignar las ventas al cliente
      for (const sale of sales) {
        sale.customer = customer;
        await this.salesRepository.save(sale);
      }
  
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

  async generateBillReport(billId: string): Promise<any> {
    try {
      // Buscar la factura por ID
      const bill = await this.billsRepository.findOne({
        where: { idBills: billId },
        relations: ['sales', 'sales.product', 'customer']
      });
  
      if (!bill) {
        throw new Error('Factura no encontrada');
      }
  
      // Crear el cuerpo del reporte
      let reportBody = [
        ['ID de venta', 'Nombre del producto', 'Precio del producto', 'Cantidad', 'Total']
      ];
  
      let totalBill = 0;
  
      bill.sales.forEach(sale => {
        let saleTotal = sale.quantity * sale.product.price;
        totalBill += saleTotal;
        reportBody.push([
          sale.idSales, 
          sale.product.productName, 
          sale.product.price.toString(), 
          sale.quantity.toString(), 
          saleTotal.toString()
        ]);
      });
  
      reportBody.push(['', '', '', 'Total', totalBill.toString()]);
  
      // Crear el reporte
      let report = {
        billId: bill.idBills,
        date: bill.date,
        customer: bill.customer ? `${bill.customer.user.firstName} ${bill.customer.user.lastName}` : 'No disponible',
        total: totalBill,
        details: reportBody
      };
  
      return report;
    } catch (error) {
      throw new Error(`Error al generar el reporte de la factura: ${error.message}`);
    }
  }
}