import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class WorkerDto  {
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

export class UpdateWorkerDto extends OmitType(WorkerDto, ['userId']) {}

