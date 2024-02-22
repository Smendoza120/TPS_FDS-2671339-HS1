import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InventoryDto } from '../dto/inventory-dto';
import { InventoryEntitie } from '../entities/inventory.entity';
import { ProductService } from './products.service';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_REPOSITORY')
    private iInventoryEntitie: Repository<InventoryEntitie>,
  ) {}

  async create(dto: InventoryDto): Promise<InventoryEntitie> {
    try {
      const inventory = this.iInventoryEntitie.create(dto);
      await this.iInventoryEntitie.save(inventory);
      return inventory;
    } catch (error) {
      throw new Error(`Failed to create inventory: ${error.message}`);
    }
  }

  async update(id: string, dto: InventoryDto): Promise<InventoryEntitie> {
    try {
      const inventory = await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}});
      Object.assign(inventory, dto);
      await this.iInventoryEntitie.save(inventory);
      return inventory;
    } catch (error) {
      throw new Error(`Failed to update inventory: ${error.message}`);
    }
  }

  async find(): Promise<any[]> {
    try {
      const inventories = await this.iInventoryEntitie.find({ relations: ["products"] });
      return inventories.map(inventory => {
        const productSummary = inventory.products.reduce((summary, product) => {
          if (!summary[product.productName]) {
            summary[product.productName] = {
              quantity: 0,
              total: 0,
            };
          }
          summary[product.productName].quantity += product.quantity;
          summary[product.productName].total += product.price * product.quantity;
          return summary;
        }, {});
        return {
          ...inventory,
          productSummary,
        };
      });
    } catch (error) {
      throw new Error(`Failed to find inventories: ${error.message}`);
    }
  }

  async findById(id: string): Promise<InventoryEntitie> {
    try {
      return await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}, relations: ["products"]});
    } catch (error) {
      throw new Error(`Failed to find inventory by ID: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const inventory = await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}});
      await this.iInventoryEntitie.remove(inventory);
    } catch (error) {
      throw new Error(`Failed to delete inventory: ${error.message}`);
    }
  }
}