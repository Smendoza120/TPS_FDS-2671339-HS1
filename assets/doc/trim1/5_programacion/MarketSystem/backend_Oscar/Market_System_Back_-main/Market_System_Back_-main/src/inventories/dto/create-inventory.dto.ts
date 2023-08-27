import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsPositive,
} from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  readonly storage: string;
  @IsNotEmpty()
  @IsDate()
  readonly date_purchase: Date;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly unit_price: number;
  @IsNotEmpty()
  @IsDate()
  readonly due_date: Date;
  @IsNotEmpty()
  @IsString()
  readonly product: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity_products: number;
}
