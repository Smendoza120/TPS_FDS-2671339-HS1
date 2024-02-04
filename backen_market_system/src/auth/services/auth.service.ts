import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'; 
import { WorkersService } from 'src/ms/services/workers.service'; 
import { WorkerEntity } from 'src/ms/entities/workers.entity';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from '../dto/reset-password.dto';

import * as bcrypt from 'bcrypt'; // Importa la biblioteca bcrypt para comparar contraseñas
import * as crypto from 'crypto';

@Injectable() 
export class AuthService {
  constructor(private readonly iWorkersService: WorkersService,
    private readonly jwtService: JwtService
    ) {}

  // Método para validar un usuario. Recibe un correo electrónico y una contraseña
  async validateUser(email: string, password: string) {
    // Busca un trabajador por correo electrónico utilizando el servicio WorkersService
    const worker = await this.iWorkersService.getWorkerByEmail(email);
    // Si el trabajador existe
    if (worker) {
      // Compara la contraseña proporcionada con la contraseña almacenada del trabajador
      const isMatch = await bcrypt.compare(password, worker.password);
      // Si las contraseñas coinciden
      if (isMatch) {
        // Desestructura el trabajador para obtener la contraseña y el resto de las propiedades
        const { password, ...result } = worker;
        // Devuelve el resto de las propiedades (excluyendo la contraseña)
        return result;
      }
      // Si las contraseñas no coinciden, devuelve null
      return null;
    }
    // Si el trabajador no existe, la función termina sin devolver nada
  }

  generateJWT(worker: WorkerEntity) {
    // Crea el payload del token. Este payload incluye el correo electrónico del trabajador y su ID
    const payload = { email: worker.user.worker, sub: worker.idWorker };
    // Devuelve un objeto que incluye el token de acceso y el trabajador
    return {
      // Usa el servicio jwtService para firmar el payload y generar el token de acceso
      access_token: this.jwtService.sign(payload),
      // Incluye el trabajador en el objeto de respuesta
      worker
    };
  }

  async createPasswordResetToken(email: string): Promise<void> {
    // Obtener el trabajador por ID
    const worker = await this.iWorkersService.getWorkerByEmail(email);
  
    if (!worker) {
      throw new NotFoundException(`Worker not found`);
    }
  
    // Generar un token de restablecimiento de contraseña
    const token = crypto.randomBytes(20).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 1); // El token expira en 1 hora
  
    // Guardar el token y la fecha de vencimiento en la base de datos
    worker.passwordResetToken = token;
    worker.passwordResetExpires = expires;
  
    await this.iWorkersService.save(worker);
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<void> {
    // Buscar al trabajador por el token de restablecimiento de contraseña
    const worker = await this.iWorkersService.getWorkerByResetToken(token);
  
    if (!worker) {
      throw new NotFoundException('Invalid password reset token');
    }
  
    // Verificar que el token no haya expirado
    if (new Date() > worker.passwordResetExpires) {
      throw new BadRequestException('Password reset token has expired');
    }

      // Comprobar que las contraseñas coinciden
  if (resetPasswordDto.password !== resetPasswordDto.confirmPassword) {
    throw new BadRequestException('Passwords do not match');
  }
  
    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(resetPasswordDto.password, salt);
  
    // Actualizar la contraseña del trabajador y eliminar el token de restablecimiento de contraseña
    worker.password = hashedPassword;
    worker.passwordResetToken = null;
    worker.passwordResetExpires = null;
  
    // Guardar el trabajador actualizado
    await this.iWorkersService.save(worker);
  }
}
