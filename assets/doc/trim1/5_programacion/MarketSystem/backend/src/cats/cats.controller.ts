import {
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateCat } from './dto/create-cat.dto';
import { EditCat } from './dto/edit-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interface/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async createCat(@Body() createCat: CreateCat) {
    this.catsService.createCat(createCat);
  }

  @Get()
  async getAllCats(): Promise<Cat[]> {
    return this.catsService.getAllCats();
  }

  @Get(':name')
  async getCat(@Param('name') name: string): Promise<Cat> {
    return this.catsService.getCat(name);
  }

  @Delete(':id')
  deleteCat(@Param('id', ParseIntPipe) id: number): string {
    return `This action delete a ${id} cat`;
  }

  @Patch(':id')
  editCat(
    @Body() updateCat: EditCat,
    @Param('id', ParseIntPipe) id: number,
  ): string {
    return `This action update a ${id} ${updateCat.name} cat`;
  }
}
