import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { OwnerService } from '../services/owner.service';
import { CreateOwnerDto } from '../dto/create-owner.dto';
import { UpdateOwnerDto } from '../dto/update-owner.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get(':id')
  async getOwner(@Param('id', ParseIntPipe) id: number) {
    return this.ownerService.getOwner(id);
  }

  @Get()
  async findAll() {
    return this.ownerService.getAllOwners();
  }

  @Post()
  async createOwner(@Body() createOwner: CreateOwnerDto) {
    return this.ownerService.createOwner(createOwner);
  }

  @Patch(':id')
  async updateOwner(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOwner: UpdateOwnerDto,
  ) {
    return this.ownerService.updateOwner(id, updateOwner);
  }

  @Delete(':id')
  async deleteOwner(@Param('id', ParseIntPipe) id: number) {
    return this.ownerService.deleteOwner(id);
  }
}
