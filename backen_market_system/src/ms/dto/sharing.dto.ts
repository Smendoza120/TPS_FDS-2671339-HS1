import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BillsEntity } from '../entities/bills.entity';

export class ShareBillDto {
  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  bill: BillsEntity;

  @IsNotEmpty()
  @IsString()
  attachmentPath: string;
}