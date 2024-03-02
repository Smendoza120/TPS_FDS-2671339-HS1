import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsUUID, IsNumber } from "class-validator";

export class ProductDto {
    @ApiProperty()
    @IsString()
    productName: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNumber()
    quantity: number;
    
    @ApiProperty()
    @IsString()
    purchaseDate: string;

    @ApiProperty()
    @IsString()
    storage: string;

    @ApiProperty()
    @IsString()
    inventory_id: string;
}

export class UpdateProductDto extends PartialType(ProductDto) {}