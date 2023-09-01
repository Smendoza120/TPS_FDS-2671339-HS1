import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsNumber()
  @IsNotEmpty()
  readonly id_users: number;
}
