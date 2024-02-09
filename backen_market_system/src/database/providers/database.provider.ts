import { DataSource } from 'typeorm';
import { UserEntity } from 'src/ms/entities/users.entity';
import { WorkerEntity } from 'src/ms/entities/workers.entity';
import { CustomerEntity } from 'src/ms/entities/customers.entity';
import { InventoryEntitie } from 'src/ms/entities/inventory.entity';
import { ProductsEntity } from 'src/ms/entities/products.entity';
import { SalesEntity } from 'src/ms/entities/sales.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {

      const datasource = new DataSource({
        type: 'postgres', 
        host: process.env.POSTGRES_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [UserEntity, WorkerEntity, CustomerEntity, InventoryEntitie, ProductsEntity, SalesEntity],
        synchronize: true,
        ssl: process.env.POSTGRES_SSL === 'true',
        extra: {
          ssl: 
            process.env.POSTGRES_SSL === 'true'
            ? {
              rejectUnauthorized: false,
            }
            : null,
          },
      });
      return datasource.initialize();
    },
  },
];