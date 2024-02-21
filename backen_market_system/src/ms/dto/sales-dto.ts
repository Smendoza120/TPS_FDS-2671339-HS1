import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsUUID, IsString } from "class-validator";

export class SalesDto {
  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsString()
  salesDate: string;

  @ApiProperty()
  @IsUUID()
  customerId: string;

  @ApiProperty() // Asume que el ID del producto es un string
  @IsString() // Valida que el ID es un UUID v4
  productId: string;
}

export class UpdateSalesDto extends PartialType(SalesDto) {}