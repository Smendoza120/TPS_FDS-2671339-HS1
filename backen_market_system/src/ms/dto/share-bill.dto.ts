import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShareBillDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billId: string;

  @ApiProperty()
  @IsEmail()
  email?: string;
}
