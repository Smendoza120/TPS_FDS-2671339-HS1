import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InventoryDto } from '../dto/inventory-dto';
import { InventoryEntitie } from '../entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('INVENTORY_REPOSITORY')
    private iInventoryEntitie: Repository<InventoryEntitie>,
  ) {}

  async create(dto: InventoryDto): Promise<InventoryEntitie> {
    const inventory = this.iInventoryEntitie.create(dto);
    await this.iInventoryEntitie.save(inventory);
    return inventory;
  }

  async update(id: string, dto: InventoryDto): Promise<InventoryEntitie> {
    const inventory = await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}});
    Object.assign(inventory, dto);
    await this.iInventoryEntitie.save(inventory);
    return inventory;
  }

  async find(): Promise<any[]> {
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
  }

  async findById(id: string): Promise<InventoryEntitie> {
    return await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}, relations: ["products"]});
  }

  async delete(id: string): Promise<void> {
    const inventory = await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}});
    await this.iInventoryEntitie.remove(inventory);
  }
}