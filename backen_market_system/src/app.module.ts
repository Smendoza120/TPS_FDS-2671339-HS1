import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MsModule } from './ms/ms.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    DatabaseModule,
    AuthModule,
    MsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
