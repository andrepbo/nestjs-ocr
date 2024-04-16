import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './constants/database.constants';
import { User } from 'src/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DATABASE_TYPE as any,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        entities: [User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];