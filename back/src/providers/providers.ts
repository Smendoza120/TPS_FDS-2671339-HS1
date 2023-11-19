import { DataSource } from 'typeorm';
import { UserEntity } from 'src/entities/users.entity';

export const Providers = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: DataSource) =>
      connection.getRepository(UserEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];
