import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { Role } from 'src/auth/models/roles.model';
// import { RolesGuard } from 'src/auth/guards/roles.guard';

// @UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Roles(Role.USERS)
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  /* The commented code block is defining a route handler for the GET request to retrieve all users. It
  is using the `@Roles` decorator to specify that only users with the role "USERS" are allowed to
  access this route. */
  // @Roles(Role.USERS)
  @Get()
  findAll() {
    // Agrega los permisos al objeto `request` para todas las rutas de UsersController.
    return this.usersService.findAll();
  }

  // @Roles(Role.USERS)
  // @Get()
  // async findAll(@Req() request) {
  //   // Obtener el usuario autenticado del objeto `request`
  //   const user = request.user;

  //   // Comprueba si el usuario y el objeto `owner` existen
  //   if (user && user.owner) {
  //     // Asigna los permisos del objeto `owner` al objeto `request`
  //     request.permissions = user.owner;
  //     // console.log('User Permissions:', request);
  //   } else {
  //     // Si no existen, asigna un objeto vacío de permisos para evitar errores
  //     request.permissions = {};
  //     console.log('No User or Owner found. Permissions set to empty object.');
  //   }

  //   // Llama a la función `findAll` del servicio de usuarios
  //   console.log('Calling usersService.findAll()');
  //   const users = await this.usersService.findAll();
  //   console.log('Users retrieved:', users);

  //   return users;
  // }

  // @Roles(Role.USERS)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // @Roles(Role.USERS)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  // @Roles(Role.USERS)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }

  // @Get('mail/:mail')
  // async findByEmail(@Param('mail') mail: string, @Req() request: Request) {
  //   const user = await this.usersService.findByEmail(mail);

  //   if (!user) {
  //     throw new NotFoundException(`User with email ${mail} not found`);
  //   }

  //   // Aquí agregas los permisos al objeto request
  //   request.permissions = user.owner.permissions;

  //   return user;
  // }
}
