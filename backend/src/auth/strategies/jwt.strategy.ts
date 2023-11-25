import { Injectable,  } from '@nestjs/common'; 
import { PassportStrategy } from '@nestjs/passport'; 
import { ExtractJwt, Strategy } from 'passport-jwt'; 

@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy ,'jwt') { // Define una clase que extiende PassportStrategy con la estrategia JWT
    constructor() { // Constructor de la clase
        super( // Llama al constructor de la clase base (PassportStrategy)
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Configura la estrategia JWT para extraer el token JWT del encabezado de autorización como un token Bearer
                ignoreExpiration: false, // Configura la estrategia JWT para no ignorar la expiración del token
                secretOrKey: process.env.API_CONFIG_AUTH_SECRET_JWT, // Configura la estrategia JWT para usar la clave secreta especificada en la variable de entorno API_CONFIG_AUTH_SECRET_JWT
            }
        );
    }

    validate(payload: any) { // Método de validación. Recibe el payload del token JWT
        return payload // Devuelve el payload. Esto se adjuntará al objeto de solicitud como req.user
    }
}