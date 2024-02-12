// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';

// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { Role } from '../models/roles.model';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
//     const request = context.switchToHttp().getRequest();
//     const user = request.mail;
//     const isAuth = roles.some((role) => role === user.owner.permissions);
//     if (!isAuth) {
//       throw new UnauthorizedException('No tiene los permisos pez');
//     }
//     return isAuth;
//   }
// }

// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { Role } from '../models/roles.model';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
//     const request = context.switchToHttp().getRequest();
//     const user = request.user; // Suponiendo que el usuario está disponible en la solicitud

//     // Debug: Imprime información de depuración
//     console.log('Roles:', roles);
//     console.log('User:', user);
//     console.log('User Permissions:', user.owner.permissions);

//     // Si el usuario no está autenticado o no tiene permisos definidos, se lanza una excepción
//     if (!user || !user.owner.permissions) {
//       throw new UnauthorizedException('No tiene los permisos pez');
//     }

//     // Verifica si el usuario tiene al menos uno de los permisos necesarios
//     const hasRequiredRoles = roles.some(
//       (requiredRole) =>
//         // Verifica si el usuario tiene el permiso requerido
//         user.owner.permissions[requiredRole] === 1, // Puede que necesites ajustar esto a 1 en lugar de true
//     );

//     if (!hasRequiredRoles) {
//       throw new UnauthorizedException('No tiene los permisos pez');
//     }

//     return true;
//   }
// }

// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from '../decorators/roles.decorator';
// import { Role } from '../models/roles.model';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
//     const request = context.switchToHttp().getRequest();
//     const permissions = request.permissions; // Obtener los permisos del request

//     // Debug: Imprime información de depuración
//     console.log('Roles:', roles);
//     console.log('Permissions:', permissions);

//     // Si los permisos no están definidos o el usuario no tiene los permisos requeridos, lanzar una excepción
//     if (!permissions || !this.hasRequiredRoles(roles, permissions)) {
//       throw new UnauthorizedException('No tiene los permisos pez');
//     }

//     return true;
//   }

//   private hasRequiredRoles(
//     requiredRoles: Role[],
//     userPermissions: string[],
//   ): boolean {
//     // Verifica si el usuario tiene al menos uno de los permisos requeridos
//     return requiredRoles.some((requiredRole) =>
//       userPermissions.includes(requiredRole),
//     );
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    const request = context.switchToHttp().getRequest();
    const permissions = request.permissions; // Obtener los permisos del request

    // Debug: Imprime información de depuración
    console.log('Roles:', roles);
    console.log('Permissions:', permissions);

    // Si los permisos no están definidos o el usuario no tiene los permisos requeridos, lanzar una excepción
    if (!permissions || !this.hasRequiredRoles(roles, permissions)) {
      throw new UnauthorizedException('No tiene los permisos pez');
    }

    return true;
  }

  private hasRequiredRoles(
    requiredRoles: Role[],
    userPermissions: any,
  ): boolean {
    // Verificar si el usuario tiene al menos una de las sub-permisiones requeridas para cada permiso
    return requiredRoles.some((requiredRole) => {
      return Object.keys(userPermissions[requiredRole]).some(
        (subPermission) => {
          return userPermissions[requiredRole][subPermission];
        },
      );
    });
  }
}
