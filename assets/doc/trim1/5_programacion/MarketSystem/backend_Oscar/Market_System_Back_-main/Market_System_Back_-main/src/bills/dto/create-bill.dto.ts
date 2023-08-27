import { IsNotEmpty, IsDate } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  @IsDate()
  readonly creation_date: Date;
}
