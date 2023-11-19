import { UserDto } from './user-dto';

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class WorkerDto extends UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsBoolean()
    salesPermission: boolean;

    @ApiProperty()
    @IsBoolean()
    inventoryPermission: boolean;

    @ApiProperty()
    @IsBoolean()
    usersPermission: boolean;

    @ApiProperty()
    @IsBoolean()
    billsPermission: boolean;
}

