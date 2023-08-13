import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { OwnerModule } from './owner/owner.module';
import { OwnerService } from './owner/owner.service';
import { Owner } from './owner/owner.entity';
import { OwnerController } from './owner/owner.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'market_system',
      entities: [Users, Owner],
      synchronize: true,
      autoLoadEntities: true
    }),
    UsersModule,
    OwnerModule,
  ],
  controllers: [AppController, CatsController, UsersController, OwnerController],
  providers: [AppService, CatsService, UsersService, OwnerService],
})
export class AppModule {}
