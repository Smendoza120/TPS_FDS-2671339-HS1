import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateTempSalesDto {
  @IsOptional()
  @IsString()
  idSales?: string;

  @IsOptional()
  @IsString()
  salesDate?: string;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}