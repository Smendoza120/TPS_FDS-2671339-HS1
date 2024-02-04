import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class ChangePasswordDto {

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  newPassword: string;
}