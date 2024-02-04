import { Injectable,  } from '@nestjs/common'; 
import { PassportStrategy } from '@nestjs/passport'; 
import {  Strategy } from 'passport-jwt'; 
import { Request } from 'express'; //


@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
      super({
        jwtFromRequest: (req: Request) => req.cookies.jwt,
        ignoreExpiration: false,
        secretOrKey: process.env.API_CONFIG_AUTH_SECRET_JWT,
      });
    }

    validate(payload: any) { // Método de validación. Recibe el payload del token JWT
        return payload // Devuelve el payload. Esto se adjuntará al objeto de solicitud como req.user
    }
}