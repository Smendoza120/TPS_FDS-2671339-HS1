import { Module } from '@nestjs/common';
import { WorkersController } from './controllers/workers.controller';
import { WorkersService } from './services/workers.service';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { Providers } from './providers/providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController, WorkersController],
    providers: [ ...Providers, UsersService, WorkersService],
    exports: [...Providers, UsersService, WorkersService]
})
export class MsModule {}
