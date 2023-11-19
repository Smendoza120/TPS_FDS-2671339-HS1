import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { UsersController } from './controllers/users.controller';

import { UsersService } from './services/users.service';
import { Providers } from './providers/providers';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AppController, UsersController],
  providers: [...Providers,AppService, UsersService],
})
export class AppModule {}
