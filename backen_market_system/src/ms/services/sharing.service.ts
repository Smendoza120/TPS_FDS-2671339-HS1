import { Injectable } from '@nestjs/common';
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
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Injectable()
export class SharingService {

  private transporter;
  private twilioClient;

  constructor(    private billsService: BillsService,
    private inventoryService: InventoryService,
    private reportService: ReportService,) {
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
    const { billId, email } = shareBillDto;
    const bill = await this.billsService.findBillById(billId, { relations: ['sales', 'sales.customer'] });
    if (bill.sales && bill.sales.length > 0) {
      const customerId = bill.sales[0].customer.idCustomer;
      const products = await this.billsService.getProductsByCustomerAndDate(customerId, bill.date);
      await this.shareByEmail(email, bill, products);
    }
  }

  async shareInventory(shareInventoryDto: ShareInventoryDto) {
    const { inventoryId, email } = shareInventoryDto;
    const inventory = await this.inventoryService.findById(inventoryId);
    await this.shareInventoryReportByEmail(email, inventory);
    // await this.shareInventoryReportByWhatsApp(phoneNumber, inventory);
  }

  async shareByEmail(email: string, bill: BillsEntity, products: ProductsEntity[]) {
    Object.defineProperty(pdfMake, 'vfs', {
      value: pdfFonts.pdfMake.vfs,
      writable: true,
      enumerable: true,
      configurable: true
    });
  
    let tableBody = [
      ['Product Name', 'Quantity', 'Unit Price', 'Total']
    ];
  
    products.forEach(product => {
      let total = product.quantity * product.price;
      tableBody.push([
        product.productName, 
        product.quantity.toString(), 
        product.price.toString(), 
        total.toString()
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
  }

  // async shareByWhatsApp(number: string, bill: BillsEntity) {
  //   await this.twilioClient.messages.create({
  //     body: `Here is your bill: ${JSON.stringify(bill)}`,
  //     from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,
  //     to: 'whatsapp:' + number,
  //   });
  // }

  async shareInventoryReportByEmail(email: string, inventory: InventoryEntitie) {
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
  }

  // async shareInventoryReportByWhatsApp(
  //   number: string,
  //   inventory: InventoryEntitie,
  // ) {
  //   await this.twilioClient.messages.create({
  //     body: `Here is your inventory report: ${JSON.stringify(inventory)}`,
  //     from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,
  //     to: 'whatsapp:' + number,
  //   });
  // }

  async shareSalesReportByEmail(email: string, salesReport: ReportsSalesEntity, sales: SalesEntity[]) {
    // Define the vfs property on pdfMake
    Object.defineProperty(pdfMake, 'vfs', {
      value: pdfFonts.pdfMake.vfs,
      writable: true,
      enumerable: true,
      configurable: true
    });
  
    // Initialize the table body with the headers
    let tableBody = [
      ['Product Name', 'Quantity', 'Unit Price', 'Total']
    ];
  
    // Iterate over each sale
    sales.forEach(sale => {
      // For each sale, iterate over its products
      sale.products.forEach(product => {
        // Calculate the total for the product
        let total = product.quantity * product.price;
        // Add the product data to the table body
        tableBody.push([
          product.productName, 
          product.quantity.toString(), 
          product.price.toString(), 
          total.toString()
        ]);
      });
    });
  
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
  }

  // async shareSalesReportByWhatsApp(number: string, report: ReportsSalesEntity) {
  //   await this.twilioClient.messages.create({
  //     body: `Here is your sales report: ${JSON.stringify(report)}`,
  //     from: 'whatsapp:' + process.env.TWILIO_PHONE_NUMBER,
  //     to: 'whatsapp:' + number,
  //   });
  // }
}