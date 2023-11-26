import { DataSource } from 'typeorm';
import { UserEntity } from 'src/ms/entities/users.entity';
import { WorkerEntity } from 'src/ms/entities/workers.entity';
import { CustomerEntity } from 'src/ms/entities/customers.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      // const portD: number = parseInt(process.env.API_DATABASE_PORT);

      const datasource = new DataSource({
        type: 'mysql',
        host: "127.0.0.1",
        port: 3306,
        username: 'root',
        password: 'admin',
        database: 'market_system_pro',
        // host: process.env.API_DATABASE_HOST,
        // port: isNaN(portD) ? 3306 : portD,
        // username: process.env.API_DATABASE_USERNAME,
        // password: process.env.API_DATABASE_PASSWORD,
        // database: process.env.API_DATABASE_NAME,
        entities: [UserEntity, WorkerEntity, CustomerEntity],
        synchronize: true,
        logging: false 
      });
      datasource.initialize().catch(error => {
        console.error('Error al inicializar la conexión a la base de datos:', error);
      });
      return datasource.initialize();
    },
  },
];
