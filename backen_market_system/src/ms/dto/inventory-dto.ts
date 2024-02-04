import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class InventoryDto {
    @ApiProperty()
    @IsInt()
    quantity: number;

    @ApiProperty()
    @IsString()
    storage: string;
}

export class UpdateInventoryDto extends PartialType(InventoryDto) {}