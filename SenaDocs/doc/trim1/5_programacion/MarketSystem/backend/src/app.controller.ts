import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator'; //para que el end Pint sea publico

import { ApikeyGuard } from './auth/guards/apikey.guard';

@UseGuards(ApikeyGuard) // proteccion para todos los endPonit
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public() // variable traida de public decoretor
  getHello(): string {
    return this.appService.getHello();
  }
}
