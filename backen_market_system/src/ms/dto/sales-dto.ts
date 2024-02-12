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

  @ApiProperty({ type: [String] }) // Asume que los IDs de los productos son strings
  @IsUUID(4, { each: true }) // Valida que cada ID es un UUID v4
  productIds: string[];
}

export class UpdateSalesDto extends PartialType(SalesDto) {}