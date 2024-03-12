import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBillDto {
  @ApiProperty()
  @IsString()
  customerId: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  salesIds: string[]; // changed from productIds to salesIds

  @ApiProperty()
  @IsString()
  date: string;
}