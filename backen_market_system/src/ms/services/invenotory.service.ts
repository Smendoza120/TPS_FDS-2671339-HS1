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

  async find(): Promise<InventoryEntitie[]> {
    return await this.iInventoryEntitie.find({ relations: ["products"] });
  }

  async findById(id: string): Promise<InventoryEntitie> {
    return await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}, relations: ["products"]});
  }

  async delete(id: string): Promise<void> {
    const inventory = await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}});
    await this.iInventoryEntitie.remove(inventory);
  }

  async decreaseQuantity(id: string, decreaseBy: number): Promise<InventoryEntitie> {
    const inventory = await this.iInventoryEntitie.findOneOrFail({where: {idInventory: id}});
    if (inventory.queantity < decreaseBy) {
      throw new Error('Not enough items in inventory');
    }
    inventory.queantity -= decreaseBy;
    await this.iInventoryEntitie.save(inventory);
    return inventory;
  }
}