import { DataSource } from 'typeorm';
import { UserEntity } from 'src/entities/users.entity';
import { WorkerEntity } from 'src/entities/workers.entity';
import { CustomerEntity } from 'src/entities/customers.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      // const portD: number = parseInt(process.env.API_DATABASE_PORT);

      const datasource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'marketsystem',
        password: 'marketsystem123',
        database: 'marketsystem',
        // host: process.env.API_DATABASE_HOST,
        // port: isNaN(portD) ? 3306 : portD,
        // username: process.env.API_DATABASE_USERNAME,
        // password: process.env.API_DATABASE_PASSWORD,
        // database: process.env.API_DATABASE_NAME,
        entities: [UserEntity, WorkerEntity, CustomerEntity],
        synchronize: true,
      });
      return datasource.initialize();
    },
  },
];
