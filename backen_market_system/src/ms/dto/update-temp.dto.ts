import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateTempSalesDto {
  @IsOptional()
  @IsString()
  idSales?: string;

  @IsOptional()
  @IsDate()
  salesDate?: Date;

  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

}