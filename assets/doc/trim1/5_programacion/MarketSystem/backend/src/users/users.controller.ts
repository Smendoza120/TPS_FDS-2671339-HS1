import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import {
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Users } from './users.entity';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUser: CreateUser) {
    this.usersService.createUser(createUser);
  }

  @Get()
  readAllUsers(): Promise<Users[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  readUser(@Body() @Param('id', ParseIntPipe) id: number): Promise<Users> {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUser) {
    return this.usersService.updateUser(id, user);
  }
}
