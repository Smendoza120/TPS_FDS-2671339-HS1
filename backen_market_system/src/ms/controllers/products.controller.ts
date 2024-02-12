import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from '../services/products.service';
import { ProductDto } from '../dto/products-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    description: 'Create product',
  })
  @Post()
  async create(@Body() dto: ProductDto) {
    const product = await this.productService.create(dto);
    return { id: product.idProduct };
  }

  @ApiOperation({
    description: 'Update product',
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    try {
      const product = await this.productService.update(id, dto);
      return product;
    } catch (e) {
      throw new NotFoundException('Product not found');
    }
  }

  @ApiOperation({
    description: 'Get product by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findById(id);
      return product;
    } catch (e) {
      throw new NotFoundException('Product not found');
    }
  }

  @ApiOperation({
    description: 'Get all products',
  })
  @Get()
  async find() {
    const products = await this.productService.find();
    return products;
  }

  @ApiOperation({
    description: 'Delete product',
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      await this.productService.delete(id);
      return { message: 'Product deleted successfully' };
    } catch (e) {
      throw new NotFoundException('Product not found');
    }
  }

  @ApiOperation({
    description: 'Get product by name',
  })
  @Get('name/:name')
  async findByName(@Param('name') name: string) {
    try {
      const product = await this.productService.findByName(name);
      return product;
    } catch (e) {
      throw new NotFoundException('Product not found');
    }
  }

  @ApiOperation({
    description: 'Get product by price',
  })
  @Get('price/:price')
  async findByPrice(@Param('price') price: number) {
    try {
      const products = await this.productService.findByPrice(price);
      return products;
    } catch (e) {
      throw new NotFoundException('Product not found');
    }
  }
}
