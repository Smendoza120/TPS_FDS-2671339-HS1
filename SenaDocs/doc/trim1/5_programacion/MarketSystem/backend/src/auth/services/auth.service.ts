// auth/services/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/services/users.service';
import { LoginDto } from '../dto/login.dto';
// import { OwnerService } from '../../owner/services/owner.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    // private readonly ownerService: OwnerService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(mail: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(mail);
    // const owner = await this.ownerService.findOne(user.id_users);

    console.log('User:', user); // Imprimir información sobre el usuario recuperado

    if (!user) {
      return null;
    }

    // Cargar la relación 'user' en la entidad 'Owner'

    await user.owner; // Cargar la relación 'permissions' en la entidad 'Owner'

    console.log('Password in Owner:', user.owner.password); // Imprimir la contraseña en la entidad 'Owner'
    console.log('User Permissions:', user.owner); // Imprimir los permisos relacionados con el usuario

    // Comparar la contraseña proporcionada con la contraseña almacenada
    const passwordMatch = await bcrypt.compare(password, user.owner.password);

    if (!passwordMatch) {
      console.log('Cambio en la contraseña');
      return null;
    }

    return user.owner;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.mail, loginDto.password);
    console.log('Login user:', user); // Imprimir información sobre el usuario después de la validación

    if (!user) {
      throw new UnauthorizedException('Invalid credentials, mi papa');
    }
    const payload = { sub: user.id_users };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
