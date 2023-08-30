import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id_users: number;
}
