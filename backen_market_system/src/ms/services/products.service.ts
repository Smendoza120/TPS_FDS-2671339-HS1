import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../entities/products.entity.js';
import { ProductDto } from '../dto/products-dto.js';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private iProductsEntity: Repository<ProductsEntity>,
  ) {}

  async create(dto: ProductDto): Promise<ProductsEntity> {
    const product = this.iProductsEntity.create(dto);
    await this.iProductsEntity.save(product);
    return product;
  }

  async update(id: string, dto: ProductDto): Promise<ProductsEntity> {
    const product = await this.iProductsEntity.findOneOrFail({where: {idProduct: id}});
    Object.assign(product, dto);
    await this.iProductsEntity.save(product);
    return product;
  }

  async updateQuantity(id: string, quantity: number): Promise<ProductsEntity> {
    const product = await this.iProductsEntity.findOne({ where: { idProduct: id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    product.quantity -= quantity;
    await this.iProductsEntity.save(product);
    return product;
  }

  async find(): Promise<ProductsEntity[]> {
    return await this.iProductsEntity.find();
  }

  async findById(id: string): Promise<ProductsEntity> {
    return await this.iProductsEntity.findOneOrFail({where: {idProduct: id}});
  }

  async findByName(name: string): Promise<ProductsEntity> {
    return await this.iProductsEntity.findOneOrFail({ where: { productName: name } });
  }

  async findByPrice(price: number): Promise<ProductsEntity[]> {
    return await this.iProductsEntity.find({ where: { price: price } });
  }

  async delete(id: string): Promise<void> {
    const product = await this.iProductsEntity.findOneOrFail({where: {idProduct: id}});
    await this.iProductsEntity.remove(product);
  }
}