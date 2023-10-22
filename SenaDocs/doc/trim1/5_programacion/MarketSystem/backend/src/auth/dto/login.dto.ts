import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  readonly mail: string;

  @IsNotEmpty()
  readonly password: string;
}
