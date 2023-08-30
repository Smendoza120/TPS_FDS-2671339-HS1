// import { PartialType } from "@nestjs/swagger";
// import { CreateCustomerDto } from "./create-customer.dto";

// export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateCustomerDto {
  @IsNotEmpty()
  @IsNumber()
  readonly id_users?: number;
}