import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;
    
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    phone: string;
}

export class UpdateUserDto extends PartialType(UserDto) {}