import { IsOptional, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePermissionDto {
  @IsBoolean()
  @IsOptional()
  readonly permission_sales: boolean;

  @IsBoolean()
  @IsOptional()
  readonly permission_users: boolean;

  @IsBoolean()
  @IsOptional()
  readonly permission_inventories: boolean;

  @IsBoolean()
  @IsOptional()
  readonly permission_bill: boolean;

  @IsNumber()
  @IsNotEmpty()
  readonly id_owner: number;

  @IsNumber()
  @IsNotEmpty()
  readonly id_employee: number;
}
