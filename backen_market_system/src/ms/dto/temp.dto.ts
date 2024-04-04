import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class TempSalesDto {
  @IsNotEmpty()
  @IsString()
  idSales: string;

  @IsNotEmpty()
  @IsDate()
  salesDate: Date;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}