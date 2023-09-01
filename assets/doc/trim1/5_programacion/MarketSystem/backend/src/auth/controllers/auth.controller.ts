// auth.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from '../strategys/local-auth.guard'; // Importa el guard local

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Usa el decorator para indicar que este endpoint es público
  @Post('login')
  @UseGuards(LocalAuthGuard) // Usa el guard local
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

