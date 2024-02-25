import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductsEntity } from '../entities/products.entity.js';
import { ProductDto } from '../dto/products-dto.js';
import {InventoryService} from './invenotory.service.js'

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private iProductsEntity: Repository<ProductsEntity>,
  ) {}

  async create(dto: ProductDto): Promise<ProductsEntity> {
    try {
      const product = this.iProductsEntity.create(dto);
      await this.iProductsEntity.save(product);
      return product;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async update(id: string, dto: ProductDto): Promise<ProductsEntity> {
    try {
      const product = await this.iProductsEntity.findOneOrFail({where: {idProduct: id}});
      Object.assign(product, dto);
      await this.iProductsEntity.save(product);
      return product;
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async updateQuantity(id: string, quantity: number): Promise<ProductsEntity> {
    try {
      const product = await this.iProductsEntity.findOne({ where: { idProduct: id } });
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      product.quantity -= quantity;
      await this.iProductsEntity.save(product);
      return product;
    } catch (error) {
      throw new Error(`Failed to update product quantity: ${error.message}`);
    }
  }

  async find(): Promise<ProductsEntity[]> {
    try {
      return await this.iProductsEntity.find();
    } catch (error) {
      throw new Error(`Failed to find products: ${error.message}`);
    }
  }

  async findById(id: string): Promise<ProductsEntity> {
    try {
      return await this.iProductsEntity.findOneOrFail({where: {idProduct: id}});
    } catch (error) {
      throw new Error(`Failed to find product by ID: ${error.message}`);
    }
  }

  async findByName(name: string): Promise<ProductsEntity> {
    try {
      return await this.iProductsEntity.findOneOrFail({ where: { productName: name } });
    } catch (error) {
      throw new Error(`Failed to find product by name: ${error.message}`);
    }
  }

  async findByPrice(price: number): Promise<ProductsEntity[]> {
    try {
      return await this.iProductsEntity.find({ where: { price: price } });
    } catch (error) {
      throw new Error(`Failed to find products by price: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const product = await this.iProductsEntity.findOneOrFail({where: {idProduct: id}});
      await this.iProductsEntity.remove(product);
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
}