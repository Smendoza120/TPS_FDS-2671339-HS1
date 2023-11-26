import { DataSource } from 'typeorm';
import { UserEntity } from 'src/ms/entities/users.entity';
import { WorkerEntity } from 'src/ms/entities/workers.entity';
import { CustomerEntity } from 'src/ms/entities/customers.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const portD: number = parseInt(process.env.API_DATABASE_PORT);

      const datasource = new DataSource({
        type: 'mysql',
        host: process.env.API_DATABASE_HOST,
        port: isNaN(portD) ? 3306 : portD,
        username: process.env.API_DATABASE_USER,
        password: process.env.API_DATABASE_PASS,
        database: process.env.API_DATABASE_SCHEMA,
        entities: [UserEntity, WorkerEntity, CustomerEntity],
        synchronize: true,
      });
      return datasource.initialize();
    },
  },
];