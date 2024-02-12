import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  readonly password: string;

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
  readonly id_users: number;
}
