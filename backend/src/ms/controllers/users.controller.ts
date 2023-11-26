import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from 'src/ms/dto/user-dto';

import {ApiOperation, ApiTags} from "@nestjs/swagger";
// import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({
        description: 'Get all users',
    })
    @Get()
    async findAllUsers() {
        return this.usersService.getAllUsers();
    }


    @ApiOperation({
        description: 'Get user by id',
    })
    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @ApiOperation({
        description: 'Create user',
    })
    @Post()
    async create(@Body() createUserDto: UserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiOperation({
        description: 'Update user',
    })
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({
        description: 'Delete user',
    })
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
