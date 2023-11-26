import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { WorkerEntity } from 'src/ms/entities/workers.entity';
import { UserEntity } from 'src/ms/entities/users.entity';
import { UpdateWorkerDto, WorkerDto } from 'src/ms/dto/workers-dto';
import { UsersService } from './users.service';

import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class WorkersService {
  constructor(
    @Inject('WORKERS_REPOSITORY')
    private iWorkerEntity: Repository<WorkerEntity>,
    private iUserService: UsersService,
  ) {}

  async getUserById(id: string): Promise<UserEntity> {
    try {
      // Intenta obtener el usuario por su ID
      const user = await this.iUserService.getUserById(id);

      // Si el usuario no se encuentra (es decir, getUserById devuelve null o undefined), lanza una NotFoundException
      if (!user) {
        throw new NotFoundException(`Worker not found`);
      }

      // Si el usuario se encuentra, devuélvelo
      return user;
    } catch (error) {
      // Si ocurre cualquier otro error durante la ejecución del método, también lanza una NotFoundException
      throw new NotFoundException(`Worker not found`);
    }
  }

  async createWorker(workerDto: WorkerDto): Promise<WorkerEntity> {
    try {
      // Obtener el usuario por ID
      const user = await this.getUserById(workerDto.userId);

      if (!user) {
        throw new NotFoundException(
          `User with ID ${workerDto.userId} not found`,
        );
      }

      // Crear un nuevo worker
      const worker = new WorkerEntity();

      // Asignar el usuario al worker
      worker.user = user;

      // Asignar los campos del DTO al worker
      Object.assign(worker, workerDto);

      // Encriptar la contraseña
      const salt = await bcrypt.genSalt();
      worker.password = await bcrypt.hash(workerDto.password, salt);

      // Guardar el nuevo worker
      await this.iWorkerEntity.save(worker);

      return worker;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getWorkerById(id: string): Promise<WorkerEntity> {
    try {
      // Intenta obtener el worker por su ID
      const worker = await this.iWorkerEntity.findOneOrFail({
        where: {
          idWorker: id,
        },
      });

      // Si el worker se encuentra, devuélvelo
      return worker;
    } catch (error) {
      // Si ocurre cualquier error durante la ejecución del método (por ejemplo, el worker no se encuentra),
      // lanza una NotFoundException
      throw new NotFoundException(`Worker  not found`);
    }
  }

  async save(worker: WorkerEntity): Promise<WorkerEntity> {
    return await this.iWorkerEntity.save(worker);
  }

  async getWorkerByEmail(email: string): Promise<WorkerEntity> {
    try {
      // Intenta obtener el worker por su email
      const worker = await this.iWorkerEntity.findOneOrFail({
        where: {
          user: {
            email: email,
          },
        },
      });

      // Si el worker se encuentra, devuélvelo
      return worker;
    } catch (error) {
      // Si ocurre cualquier error durante la ejecución del método (por ejemplo, el worker no se encuentra),
      // lanza una NotFoundException
      throw new NotFoundException(`Worker with email ${email} not found`);
    }
  }

  async getAllWorkers(): Promise<WorkerEntity[]> {
    try {
      // Intenta obtener todos los workers
      const workers = await this.iWorkerEntity.find();

      // Si se obtienen los workers correctamente, devuélvelos
      return workers;
    } catch (error) {
      // Si ocurre cualquier error durante la ejecución del método,
      // lanza una InternalServerErrorException
      throw new InternalServerErrorException('Error retrieving workers');
    }
  }

  async updateWorker(
    id: string,
    updateData: UpdateWorkerDto,
  ): Promise<WorkerEntity> {
    try {
      // Intenta obtener el worker por su ID
      const worker = await this.getWorkerById(id);

      // Si el worker no se encuentra, lanza una NotFoundException
      if (!worker) {
        throw new NotFoundException(`Worker not found`);
      }

      // Asignar los campos del DTO al worker
      Object.assign(worker, updateData);

      // Intenta guardar el worker actualizado
      await this.iWorkerEntity.save(worker);

      // Si el worker se guarda correctamente, devuélvelo
      return worker;
    } catch (error) {
      // Si ocurre cualquier otro error durante la ejecución del método,
      // lanza una InternalServerErrorException
      throw new InternalServerErrorException(`Error updating worker`);
    }
  }

  async deleteWorker(id: string): Promise<WorkerEntity> {
    try {
      // Intenta obtener el worker por su ID
      const worker = await this.getWorkerById(id);

      // Si el worker no se encuentra, lanza una NotFoundException
      if (!worker) {
        throw new NotFoundException(`Worker not found`);
      }

      // Intenta eliminar el worker
      await this.iWorkerEntity.softDelete(worker.idWorker);

      // Si el worker se elimina correctamente, devuélvelo
      return worker;
    } catch (error) {
      // Si ocurre cualquier otro error durante la ejecución del método,
      // lanza una InternalServerErrorException
      throw new InternalServerErrorException(`Error deleting worker`);
    }
  }

  async getWorkerByResetToken(token: string): Promise<WorkerEntity> {
    // Buscar al trabajador por el token de restablecimiento de contraseña
    const worker = await this.iWorkerEntity.findOne({
      where: {
        passwordResetToken: token,
      },
    });

    // Si no se encuentra ningún trabajador con ese token, devuelve null
    if (!worker) {
      return null;
    }

    // Si se encuentra un trabajador con ese token, devuélvelo
    return worker;
  }

  async findWorkerByResetPasswordToken(token: string): Promise<WorkerEntity> {
    // Buscar al trabajador por el token de restablecimiento de contraseña
    const worker = await this.iWorkerEntity.findOne({
      where: {
        passwordResetToken: token,
      },
    });

    // Si no se encuentra ningún trabajador con ese token, devuelve null
    if (!worker) {
      return null;
    }

    // Si se encuentra un trabajador con ese token, devuélvelo
    return worker;
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<WorkerEntity> {
    try {
      // Intenta obtener el worker por su ID
      const worker = await this.getWorkerById(id);

      // Si el worker no se encuentra, lanza una NotFoundException
      if (!worker) {
        throw new NotFoundException(`Worker not found`);
      }

      // Verifica si la contraseña anterior ingresada coincide con la contraseña actual del worker
      const isPasswordMatch = await bcrypt.compare(
        changePasswordDto.oldPassword,
        worker.password,
      );

      // Si la contraseña anterior no coincide, lanza una excepción
      if (!isPasswordMatch) {
        throw new Error(`Incorrect old password`);
      }

      // Actualiza la contraseña del worker
      worker.password = changePasswordDto.newPassword;

      // Intenta guardar el worker con la nueva contraseña
      await this.iWorkerEntity.save(worker);

      // Si el worker se guarda correctamente, devuélvelo
      return worker;
    } catch (error) {
      // Si ocurre cualquier otro error durante la ejecución del método,
      // lanza una InternalServerErrorException
      throw new InternalServerErrorException(`Error changing password`);
    }
  }
}
