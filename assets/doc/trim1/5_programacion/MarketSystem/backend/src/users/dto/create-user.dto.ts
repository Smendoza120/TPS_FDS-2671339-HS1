import { IsString } from 'class-validator';

export class CreateUser {
  @IsString()
  names: string;
  
  @IsString()
  mail: string;
  
  @IsString()
  phone: string;
}
