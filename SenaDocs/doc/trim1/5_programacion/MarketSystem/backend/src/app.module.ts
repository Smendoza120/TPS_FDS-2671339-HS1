import * as joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppService } from './app.service';

import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { InventoriesModule } from './inventories/inventories.module';
import { BillsModule } from './bills/bills.module';
import { DatabaseModule } from './database/database.module';

import { enviroments } from './enviroments';
import { OwnerModule } from './owner/owner.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { CorsModule } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        API_KEY: joi.string().required(),
        DATABASE_NAME: joi.string().required(),
        DATABASE_PORT: joi.number().required(),
      }),
    }),
    UsersModule,
    SalesModule,
    OwnerModule,
    InventoriesModule,
    BillsModule,
    HttpModule,
    DatabaseModule,
    CustomerModule,
    AuthModule,
    CorsModule.forRoot({
      origin: 'http://localhost:5173', // Reemplaza con la URL de tu aplicación React
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Métodos permitidos
      allowedHeaders: ['Authorization', 'Content-Type'], // Cabeceras permitidas
      credentials: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
