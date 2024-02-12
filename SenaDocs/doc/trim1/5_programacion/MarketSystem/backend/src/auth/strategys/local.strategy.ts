import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'mail', // Nombre del campo de correo electrónico en el DTO
    });
  }

  async validate(mail: string, password: string): Promise<any> {
    return await this.authService.validateUser(mail, password);
  }
}
