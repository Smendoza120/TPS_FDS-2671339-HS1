import { BadRequestException, Body, Controller, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express'; //
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { EmailResetDto } from '../dto/email.dto';

import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { WorkerEntity } from 'src/ms/entities/workers.entity';
import { ResetPasswordDto } from '../dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly iAuthService: AuthService,
    private readonly iEmailService: EmailService,
  ) {}

  @ApiOperation({
    description: 'Login for email and password',
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const jwt = await this.iAuthService.generateJWT(req.user as WorkerEntity);
    res.cookie('jwt', jwt, { httpOnly: true });
    return { status: 'success' };
  }

  @ApiOperation({
    description: 'Reset password for email',
  })
  @Post('reset-password')
  async requestPasswordReset(@Body() resetPasswordDto: EmailResetDto) {
    const token = await this.iAuthService.createPasswordResetToken(resetPasswordDto.email);
  
    // Verifica que el token se haya generado correctamente
    if (!token) {
      throw new BadRequestException('Error generating password reset token');
    }
  
    const resetLink = `https://tuapp.com/reset-password/${token}`;
  
    await this.iEmailService.sendPasswordResetEmail(resetPasswordDto, resetLink);
  
    return {
      message: 'Se ha enviado un correo electrónico para restablecer la contraseña.',
      token: token
    };
  }
  @ApiOperation({
    description: 'Reset password',
  })
  @Post('reset-password/:token') // Esta ruta acepta un token como parámetro
  async resetPassword(
    @Param('token') token: string, // Extrae el token del parámetro de la ruta
    @Body() resetPasswordDto: ResetPasswordDto, // Extrae la nueva contraseña del cuerpo de la solicitud
  ) {
    // Intenta restablecer la contraseña utilizando el servicio AuthService
    await this.iAuthService.resetPassword(token, resetPasswordDto);
  
    return {
      message: 'Password has been reset.',
    };
  }
}
