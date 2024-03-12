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
  @IsString() 
  productId: string;
}

export class UpdateSalesDto extends PartialType(SalesDto) {}