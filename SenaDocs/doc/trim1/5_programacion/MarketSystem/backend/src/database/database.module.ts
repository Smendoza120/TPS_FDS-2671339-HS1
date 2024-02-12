import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // 👈 use TypeOrmModule
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbname, password, port } = configService.mysql;
        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbname,
          synchronize: true, // 👈 new attr
          autoLoadEntities: true, // 👈 new attr
        };
      },
    }),
  ],
  exports: [TypeOrmModule], // 👈 add in exports
})
export class DatabaseModule {}
