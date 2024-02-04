import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsDate, IsUUID, IsNumber } from "class-validator";

export class ProductDto {
    @ApiProperty()
    @IsString()
    productName: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsDate()
    dueDate: Date;
    
    @ApiProperty()
    @IsDate()
    purchaseDate: Date;

    @ApiProperty()
    @IsUUID()
    inventoryId: string;
}

export class UpdateProductDto extends PartialType(ProductDto) {}