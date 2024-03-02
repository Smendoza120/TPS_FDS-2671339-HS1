import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { BillsEntity } from '../entities/bills.entity';
import { ReportsSalesEntity } from '../entities/reports.entity';
import { InventoryEntitie } from '../entities/inventory.entity';
import { ProductsEntity } from '../entities/products.entity';
import { ShareBillDto } from '../dto/share-bill.dto';
import { ShareInventoryDto } from '../dto/share-inventory.dto';
import { ShareSalesReportDto } from '../dto/share-sales-report.dto';
import { BillsService } from './bills.service';
import { SalesEntity } from '../entities/sales.entity';
import { InventoryService } from './invenotory.service';
import { ReportService } from './reports.service';
import { ProductService } from './products.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Injectable()
export class SharingService {

  private transporter;
  private twilioClient;

  constructor(    private billsService: BillsService,
    private inventoryService: InventoryService,
    private reportService: ReportService,
    private ProductService: ProductService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.API_EMAIL,
        pass: process.env.API_EMAIL_PASSWORD,
      },
    });
  }


  async shareBill(shareBillDto: ShareBillDto) {
    try {
      const { billId, email } = shareBillDto;
      const bill = await this.billsService.findBillById(billId, { relations: ['sales', 'sales.customer', 'sales.product'] });
      if (!bill) {
        throw new NotFoundException(`Bill with ID ${billId} not found`);
      }
      if (bill.sales && bill.sales.length > 0) {
        const salesRepresentation = bill.sales.map(sale => ({
          product: sale.product,
          quantity: sale.quantity,
          total: sale.product.price * sale.quantity
        }));
        await this.shareByEmail(email, bill, salesRepresentation);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async shareInventory(shareInventoryDto: ShareInventoryDto) {
    try {
      const { inventoryId, email } = shareInventoryDto;
      const inventory = await this.inventoryService.findById(inventoryId);
      if (!inventory) {
        throw new NotFoundException(`Inventory with ID ${inventoryId} not found`);
      }
      await this.shareInventoryReportByEmail(email, inventory);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async shareByEmail(email: string, bill: BillsEntity, sales: { product: ProductsEntity, quantity: number, total: number }[]) {
    try {
      Object.defineProperty(pdfMake, 'vfs', {
        value: pdfFonts.pdfMake.vfs,
        writable: true,
        enumerable: true,
        configurable: true
      });
  
      let tableBody = [
        ['Product Name', 'Quantity', 'Unit Price', 'Total']
      ];
  
      sales.forEach(sale => {
        tableBody.push([
          sale.product.productName, 
          sale.quantity.toString(), 
          sale.product.price.toString(), 
          sale.total.toString()
        ]);
      });
  
      let currentDate = new Date();
  
      let docDefinition = {
        content: [
          'Esta es tu factura:',
          '\n',
          `Nombre del cliente: ${bill.sales[0].customer.user.firstName} ${bill.sales[0].customer.user.lastName}`,
          '\n',
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: tableBody
            }
          },
          '\nFecha de la compra: ' + bill.date,
          'Valor total: ' + bill.total,
          '\nFecha de generación de la factura: ' + currentDate.toLocaleString()
        ]
      };
  
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
      pdfDocGenerator.getBase64(async (base64) => {
        let attachment = Buffer.from(base64, 'base64');
  
        const mailOptions = {
          from: process.env.API_EMAIL,
          to: email,
          subject: 'Your Bill',
          text: 'Please find attached your bill.',
          attachments: [{
            filename: 'bill.pdf',
            content: attachment
          }]
        };
  
        await this.transporter.sendMail(mailOptions);
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async shareInventoryReportByEmail(email: string, inventory: InventoryEntitie) {
    try {
      Object.defineProperty(pdfMake, 'vfs', {
        value: pdfFonts.pdfMake.vfs,
        writable: true,
        enumerable: true,
        configurable: true
      });
  
      let tableBody = [
        ['Product Name', 'Quantity', 'Price', 'Total']
      ];
  
      let total = 0;
  
      inventory.products.forEach(product => {
        let productTotal = product.quantity * product.price;
        total += productTotal;
        tableBody.push([
          product.productName, 
          product.quantity.toString(), 
          product.price.toString(), 
          productTotal.toString()
        ]);
      });
  
      tableBody.push(['', '', 'Total', total.toString()]);
  
      let currentDate = new Date();
  
      let docDefinition = {
        content: [
          'Here is your inventory report:',
          '\n',
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: tableBody
            }
          },
          '\nFecha de generación de inventario: ' + currentDate.toLocaleString()
        ]
      };
  
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
      pdfDocGenerator.getBase64(async (base64) => {
        let attachment = Buffer.from(base64, 'base64');
  
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: 'Your Inventory Report',
          attachments: [{
            filename: 'inventory_report.pdf',
            content: attachment
          }]
        };
  
        await this.transporter.sendMail(mailOptions);
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async shareSalesReportByEmail(email: string, salesReport: ReportsSalesEntity, sales: SalesEntity[]) {
    try {
      // Define the vfs property on pdfMake
      Object.defineProperty(pdfMake, 'vfs', {
        value: pdfFonts.pdfMake.vfs,
        writable: true,
        enumerable: true,
        configurable: true
      });
  
      // Create an object to hold the quantities and totals of each product
      let productData = {};
  
      // Initialize the grand total
      let grandTotal = 0;
  
      // Iterate over each sale
      sales.forEach(sale => {
        // For each sale, get its product
        let product = sale.product;
  
        // Check if product is not null
        if (product) {
          // If this product has not been seen before, initialize its data
          if (!productData[product.productName]) {
            productData[product.productName] = {
              quantity: 0,
              total: 0,
              price: product.price
            };
          }
  
          // Update the quantity and total for this product
          productData[product.productName].quantity += sale.quantity;
          productData[product.productName].total += sale.quantity * product.price;
  
          // Add the total for this product to the grand total
          grandTotal += sale.quantity * product.price;
        }
      });
  
      // Initialize the table body with the headers
      let tableBody = [
        ['Product Name', 'Quantity', 'Unit Price', 'Total']
      ];
  
      // Iterate over each product in productData to create the table body
      for (let productName in productData) {
        let data = productData[productName];
        tableBody.push([
          productName,
          data.quantity.toString(),
          data.price.toString(),
          data.total.toString()
        ]);
      }
  
      // Add the grand total to the table body
      tableBody.push(['', '', 'Grand Total', grandTotal.toString()]);
  
      // Get the current date
      let currentDate = new Date();
  
      // Define the document structure for the PDF
      let docDefinition = {
        content: [
          'Here is your sales report:',
          '\n',
          {
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*'],
              body: tableBody
            }
          },
          '\nFecha de las ventas: ' + salesReport.date,
          '\nFecha de generación del informe: ' + currentDate.toLocaleString()
        ]
      };
  
      // Create the PDF
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
      // Get the base64 representation of the PDF
      pdfDocGenerator.getBase64(async (base64) => {
        // Convert the base64 string to a Buffer
        let attachment = Buffer.from(base64, 'base64');
  
        // Define the mail options
        const mailOptions = {
          from: process.env.API_EMAIL,
          to: email,
          subject: 'Your Sales Report',
          text: 'Please find attached your sales report.',
          attachments: [{
            filename: 'sales_report.pdf',
            content: attachment
          }]
        };
  
        // Send the email with the PDF attachment
        await this.transporter.sendMail(mailOptions);
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async shareStorageReportByEmail(email: string, storage: string) {
    try {
      // Get products by storage
      const products = await this.ProductService.findByStorage(storage);
  
      // Define the vfs property on pdfMake
      Object.defineProperty(pdfMake, 'vfs', {
        value: pdfFonts.pdfMake.vfs,
        writable: true,
        enumerable: true,
        configurable: true
      });
  
      // Initialize the table body with the headers
      let tableBody = [
        ['Product Name', 'Quantity']
      ];
  
      // Iterate over each product to create the table body
      products.forEach(product => {
        tableBody.push([
          product.productName,
          product.quantity.toString()
        ]);
      });
  
      // Get the current date
      let currentDate = new Date();
  
      // Define the document structure for the PDF
      let docDefinition = {
        content: [
          'Here is your storage report:',
          '\n',
          {
            table: {
              headerRows: 1,
              widths: ['*', '*'],
              body: tableBody
            }
          },
          '\nStorage: ' + storage,
          '\nReport generation date: ' + currentDate.toLocaleString()
        ]
      };
  
      // Create the PDF
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  
      // Get the base64 representation of the PDF
      pdfDocGenerator.getBase64(async (base64) => {
        // Convert the base64 string to a Buffer
        let attachment = Buffer.from(base64, 'base64');
  
        // Define the mail options
        const mailOptions = {
          from: process.env.API_EMAIL,
          to: email,
          subject: 'Your Storage Report',
          text: 'Please find attached your storage report.',
          attachments: [{
            filename: 'storage_report.pdf',
            content: attachment
          }]
        };
  
        // Send the email with the PDF attachment
        await this.transporter.sendMail(mailOptions);
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}