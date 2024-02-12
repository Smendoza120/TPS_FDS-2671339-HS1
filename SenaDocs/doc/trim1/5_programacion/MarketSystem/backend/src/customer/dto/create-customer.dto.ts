import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id_users: number;
}
