import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Owner } from './owner/entities/owner.entity';
import { Permissions } from './permissions/entities/permission.entity';
import { Employee } from './employee/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'market_system',
      entities: [User, Owner, Permissions, Employee],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([User, Owner, Permissions, Employee]),
  ],
})
export class AppModule {}
