// Importamos la clase DataSource de la biblioteca 'typeorm'. Esta clase representa una conexión a la base de datos.
import { DataSource } from 'typeorm';

import { UserEntity } from 'src/ms/entities/users.entity';
import { WorkerEntity } from 'src/ms/entities/workers.entity';
import { CustomerEntity } from '../entities/customers.entity';
import { SalesEntity } from '../entities/sales.entity';
import { ProductsEntity } from '../entities/products.entity';
import { InventoryEntitie } from '../entities/inventory.entity';
// Definimos y exportamos una constante llamada Providers. Esta constante es un array de objetos, donde cada objeto es un proveedor.
export const Providers = [
  {
    // El token 'USERS_REPOSITORY' se utiliza para identificar este proveedor.
    provide: 'USERS_REPOSITORY',

    // La función useFactory devuelve el repositorio de TypeORM para la entidad UserEntity. Este repositorio nos permite realizar operaciones de base de datos en la tabla de usuarios.
    useFactory: (connection: DataSource) =>
      connection.getRepository(UserEntity),

    // La propiedad inject es un array de tokens que representan las dependencias que se deben inyectar en la función useFactory. En este caso, estamos inyectando la conexión a la base de datos.
    inject: ['DATABASE_CONNECTION'],
  },
  {
    // El token 'WORKERS_REPOSITORY' se utiliza para identificar este proveedor.
    provide: 'WORKERS_REPOSITORY',

    // La función useFactory devuelve el repositorio de TypeORM para la entidad WorkerEntity. Este repositorio nos permite realizar operaciones de base de datos en la tabla de trabajadores.
    useFactory: (connection: DataSource) =>
      connection.getRepository(WorkerEntity),

    // La propiedad inject es un array de tokens que representan las dependencias que se deben inyectar en la función useFactory. En este caso, estamos inyectando la conexión a la base de datos.
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'CUSTOMERS_REPOSITORY',
    useFactory: (connection: DataSource) =>
      connection.getRepository(CustomerEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'SALES_REPOSITORY',
    useFactory: (connection: DataSource) =>
      connection.getRepository(SalesEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'PRODUCTS_REPOSITORY',
    useFactory: (connection: DataSource) =>
      connection.getRepository(ProductsEntity),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'INVENTORY_REPOSITORY',
    useFactory: (connection: DataSource) =>
      connection.getRepository(InventoryEntitie),
    inject: ['DATABASE_CONNECTION'],
  },
];
