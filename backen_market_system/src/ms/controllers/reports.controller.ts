import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReportsSalesEntity } from '../entities/reports.entity';
import { ReportService } from '../services/reports.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from '../dto/report.dto';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({
    description: 'Create report',
  })
  @Post()
  async create(@Body() createReportDto: CreateReportDto): Promise<ReportsSalesEntity> {
    return this.reportService.createDailyReport(createReportDto.date);
  }

  @ApiOperation({
    description: 'Get one report by Id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReportsSalesEntity> {
    return this.reportService.getReport(id);
  }

  @ApiOperation({
    description: 'Update report',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() report: ReportsSalesEntity,
  ): Promise<ReportsSalesEntity> {
    return this.reportService.updateReport(id, report);
  }

  @ApiOperation({
    description: 'Delete report by Id',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.reportService.deleteReport(id);
  }
}