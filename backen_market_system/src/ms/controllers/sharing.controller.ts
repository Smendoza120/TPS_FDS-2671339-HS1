import { Controller, Post, Body } from '@nestjs/common';
import { SharingService } from '../services/sharing.service';
import { ReportService } from '../services/reports.service';
import { SalesService } from '../services/sales.service';
import { BillsService } from '../services/bills.service'
import { ShareBillDto } from '../dto/share-bill.dto';
import { ShareInventoryDto } from '../dto/share-inventory.dto';
import { ShareSalesReportDto } from '../dto/share-sales-report.dto';
import { ShareStorageReportDto } from '../dto/sharing-products-storage.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('sharing')
@Controller('sharing')
export class SharingController {
  constructor(private readonly sharingService: SharingService, private readonly reportsSalesService: ReportService, private readonly salesService: SalesService, private readonly billsService: BillsService) { }

  @ApiOperation({
    description: 'Share a bill',
  })
  @Post('share-bill')
  async shareBill(@Body() shareBillDto: ShareBillDto) {
    const billReport = await this.billsService.generateBillReport(shareBillDto.billId);
    return this.sharingService.shareByEmail(shareBillDto.email, billReport);
  }

  @ApiOperation({
    description: 'Share an inventory',
  })
  @Post('share-inventory')
  async shareInventory(@Body() shareInventoryDto: ShareInventoryDto) {
    return this.sharingService.shareInventory(shareInventoryDto);
  }

  @ApiOperation({
    description: 'Share a sales report',
  })
  @Post('share-sales-report')
  async shareSalesReport(@Body() shareSalesReportDto: ShareSalesReportDto) {
    const salesReport = await this.reportsSalesService.getReport(shareSalesReportDto.reportId);
    const sales = await this.salesService.getSalesByReportId(shareSalesReportDto.reportId);
    return this.sharingService.shareSalesReportByEmail(shareSalesReportDto.email, salesReport, sales);
  }

  @ApiOperation({
    description: 'Share a storage report',
  })
  @Post('share-storage-report')
  async shareStorageReport(@Body() shareStorageReportDto: ShareStorageReportDto) {
    return this.sharingService.shareStorageReportByEmail(shareStorageReportDto.email, shareStorageReportDto.storage);
  }
}