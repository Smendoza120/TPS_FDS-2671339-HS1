import { Injectable, UnauthorizedException } from '@nestjs/common'; 
import { PassportStrategy } from '@nestjs/passport'; 
import { Strategy } from 'passport-local'; 

import { AuthService } from '../services/auth.service'; 

@Injectable() 
export class localStrategy extends PassportStrategy(Strategy ,'local') { // Define una clase que extiende PassportStrategy con la estrategia local
    constructor(private iAuthService: AuthService) { // Inyecta AuthService en el constructor
        super( // Llama al constructor de la clase base (PassportStrategy)
            {
                usernameField: 'email', // Configura la estrategia local para usar 'email' como campo de nombre de usuario
                passwordField: 'password', // Configura la estrategia local para usar 'password' como campo de contraseña
            }
        );
    }

    async validate(email: string, password: string): Promise<any> { // Método de validación. Recibe un correo electrónico y una contraseña
        const user = await this.iAuthService.validateUser(email, password); // Usa AuthService para validar el usuario
        if (!user) { // Si AuthService devuelve null (es decir, el usuario no se encuentra o la contraseña no coincide)
            throw new UnauthorizedException('not allowed'); // Lanza una excepción UnauthorizedException
        }
        return user; // Si el usuario es válido, devuelve el usuario
    }
}