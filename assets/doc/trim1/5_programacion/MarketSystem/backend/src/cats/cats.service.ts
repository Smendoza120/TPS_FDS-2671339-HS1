import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  createCat(cat: Cat) {
    this.cats.push(cat);
  }

  getAllCats(): Cat[] {
    return this.cats;
  }

  getCat(position: string): Cat {
    return this.cats[position];
  }
}
