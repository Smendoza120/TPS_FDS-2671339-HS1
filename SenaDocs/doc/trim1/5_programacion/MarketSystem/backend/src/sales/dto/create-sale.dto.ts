import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateSaleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity_sold: number;
  @IsNotEmpty()
  @IsString()
  readonly names_customers: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly product_sold: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id_customer: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id_bill: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id_daily_report: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id_inventory: number;
}
