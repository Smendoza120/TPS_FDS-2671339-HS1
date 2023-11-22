import { Body, Controller, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express'; //
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
  @UseGuards(AuthGuard('local')) // Decorador de NestJS que aplica el guard AuthGuard con la estrategia 'local' a este método. Esto significa que este método requiere autenticación y utiliza la estrategia 'local' de Passport para autenticar al usuario
  @Post('login') // Decorador de NestJS que indica que este método maneja las solicitudes POST a la ruta 'login'
  @ApiBody({ type: LoginDto }) // Decorador de Swagger que indica que este método espera un cuerpo de solicitud que coincide con la estructura definida en LoginDto
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    // Método de inicio de sesión. Extrae el cuerpo de la solicitud y lo valida contra LoginDto, e inyecta el objeto de solicitud Express
    // Devuelve el JWT generado para el usuario que ha sido adjuntado al objeto de solicitud por Passport después de la autenticación exitosa
    return this.iAuthService.generateJWT(req.user as WorkerEntity);
  }

  @ApiOperation({
    description: 'Reset password for email',
  })
  @Post('reset-password') // Decorador 'Post' que especifica que este método maneja las solicitudes POST a la ruta 'reset-password'
  async requestPasswordReset(@Body() resetPasswordDto: EmailResetDto) {
    // Método asíncrono llamado 'requestPasswordReset' que toma un 'email' de tipo string
  
    // Delega la generación del token de restablecimiento de contraseña y su almacenamiento en la base de datos al servicio AuthService
    const token = await this.iAuthService.createPasswordResetToken(resetPasswordDto.email);
  
    const resetLink = `https://tuapp.com/reset-password/${token}`; // Crea un enlace de restablecimiento de contraseña utilizando el token generado
  
    await this.iEmailService.sendPasswordResetEmail(resetPasswordDto, resetLink); // Usa el método 'sendPasswordResetEmail' del servicio EmailService para enviar el correo electrónico de restablecimiento de contraseña
  
    return {
      message:
        'Se ha enviado un correo electrónico para restablecer la contraseña.',
    }; // Devuelve un objeto con un mensaje indicando que el correo electrónico de restablecimiento de contraseña ha sido enviado
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
