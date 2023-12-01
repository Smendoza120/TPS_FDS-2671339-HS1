import { IsEmail, IsNotEmpty } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class EmailResetDto {
  @ApiProperty()  
  @IsNotEmpty()
  @IsEmail()
  email: string;
}