import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WorkersService } from 'src/ms/services/workers.service';
import { UpdateWorkerDto, WorkerDto } from 'src/ms/dto/workers-dto';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from '../dto/change-password.dto';

@ApiTags('workers')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @ApiOperation({
    description: 'Get all workers',
  })
  @Get()
  async getAllWorkers() {
    return await this.workersService.getAllWorkers();
  }

  @ApiOperation({
    description: 'Create new worker',
  })
  @Post()
  async createWorker(@Body() workerDto: WorkerDto) {
    return await this.workersService.createWorker(workerDto);
  }

  @ApiOperation({
    description: 'Get worker by Id',
  })
  @Get(':id')
  async getWorkerById(@Param('id') id: string) {
    return await this.workersService.getWorkerById(id);
  }

  @ApiOperation({
    description: 'Get worker by email',
  })
  @Get('email/:email')
  async getWorkerByEmail(@Param('email') email: string) {
    // Llama al método getWorkerByEmail del servicio con el email proporcionado y devuelve el resultado
    return await this.workersService.getWorkerByEmail(email);
  }

  @ApiOperation({
    description: 'Update worker by Id',
  })
  @Post(':id')
  async updateWorker(
    @Param('id') id: string,
    @Body() workerDto: UpdateWorkerDto,
  ) {
    return await this.workersService.updateWorker(id, workerDto);
  }

  @ApiOperation({
    description: 'Delete worker by Id',
  })
  @Delete(':id')
  async deleteWorker(@Param('id') id: string) {
    return await this.workersService.deleteWorker(id);
  }

  @ApiOperation({
    description: 'Change worker password',
  })
  @Post('change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.workersService.changePassword(id, changePasswordDto);
  }
}
