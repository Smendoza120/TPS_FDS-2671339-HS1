import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class InventoryDto {
    @ApiProperty()
    @IsString()
    storage: string;
}

export class UpdateInventoryDto extends PartialType(InventoryDto) {}