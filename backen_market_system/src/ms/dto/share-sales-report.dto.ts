import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ShareSalesReportDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reportId: string;
  
    @ApiProperty()
    @IsEmail()
    email?: string;
  }