import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/ms/entities/users.entity';
import { UserDto, UpdateUserDto } from 'src/ms/dto/user-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private iUserRepository: Repository<UserEntity>,
  ) {}

  async create(dto: UserDto): Promise<UserEntity> { // Método asíncrono llamado 'create' que toma un objeto 'dto' de tipo 'UserDto' y devuelve una promesa que se resuelve en un 'UserEntity'
    const user = new UserEntity(); // Crea una nueva instancia de 'UserEntity'
    user.firstName = dto.firstName; // Asigna el valor de 'firstName' del dto al 'firstName' del usuario
    user.lastName = dto.lastName; // Asigna el valor de 'lastName' del dto al 'lastName' del usuario
    user.email = dto.email; // Asigna el valor de 'email' del dto al 'email' del usuario
    user.phone = dto.phone; // Asigna el valor de 'phone' del dto al 'phone' del usuario
    return await this.iUserRepository.save(user); // Guarda el usuario en la base de datos utilizando el repositorio y devuelve el resultado
  }

  async getAllUsers(): Promise<UserEntity[]> { // Método asíncrono llamado 'getAllUsers' que devuelve una promesa que se resuelve en un array de 'UserEntity'
    return await this.iUserRepository.find(); // Usa el método 'find' del repositorio para buscar todos los usuarios en la base de datos y devuelve el resultado
  }

  async getUserById(id: string): Promise<UserEntity> { // Método asíncrono llamado 'getUserById' que toma un 'id' de tipo string y devuelve una promesa que se resuelve en un 'UserEntity'
    return await this.iUserRepository.findOneOrFail({ // Usa el método 'findOneOrFail' del repositorio para buscar un usuario en la base de datos por su 'idUser'
      where: {
        idUser: id, // Especifica la condición de búsqueda: el 'idUser' debe ser igual al 'id' proporcionado
      },
    });
  }

  async getUserByEmail(email: string): Promise<UserEntity> { // Método asíncrono llamado 'getUserByEmail' que toma un 'email' de tipo string y devuelve una promesa que se resuelve en un 'UserEntity'
    return await this.iUserRepository.findOneOrFail({ // Usa el método 'findOneOrFail' del repositorio para buscar un usuario en la base de datos por su 'email'
      where: {
        email: email, // Especifica la condición de búsqueda: el 'email' debe ser igual al 'email' proporcionado
      },
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> { // Método asíncrono llamado 'update' que toma un 'id' de tipo string y un 'dto' de tipo 'UpdateUserDto' y devuelve una promesa que se resuelve en un 'UserEntity'
    const user = await this.getUserById(id); // Usa el método 'getUserById' para buscar el usuario que se va a actualizar en la base de datos por su 'id'
    Object.assign(user, dto); // Usa 'Object.assign' para copiar todas las propiedades del 'dto' al usuario
    await this.iUserRepository.save(user); // Guarda el usuario actualizado en la base de datos utilizando el método 'save' del repositorio
    return user; // Devuelve el usuario actualizado
  }

  async delete(id: string): Promise<UserEntity> { // Método asíncrono llamado 'delete' que toma un 'id' de tipo string y devuelve una promesa que se resuelve en un 'UserEntity'
    const user = await this.getUserById(id); // Usa el método 'getUserById' para buscar el usuario que se va a eliminar en la base de datos por su 'id'
    await this.iUserRepository.delete(id); // Usa el método 'delete' del repositorio para eliminar el usuario de la base de datos por su 'id'
    return user; // Devuelve el usuario eliminado
  }
}

