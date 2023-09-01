import * as joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SalesModule } from './sales/sales.module';
import { InventoriesModule } from './inventories/inventories.module';
import { BillsModule } from './bills/bills.module';
import { DatabaseModule } from './database/database.module';

import { enviroments } from './enviroments';
import { OwnerModule } from './owner/owner.module';
import { PermissionsModule } from './permissions/permissions.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

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
    InventoriesModule,
    BillsModule,
    HttpModule,
    DatabaseModule,
    OwnerModule,
    PermissionsModule,
    EmployeeModule,
    CustomerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get(
          'https://jsonplaceholder.typicode.com/posts/1',
        );
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
