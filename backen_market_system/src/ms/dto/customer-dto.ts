import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CustomerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;
}

