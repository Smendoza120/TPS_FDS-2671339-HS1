import { UserDto } from './user-dto';

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CustomerDto extends UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;
}

