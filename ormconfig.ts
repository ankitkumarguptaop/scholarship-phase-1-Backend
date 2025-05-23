import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SeederOptions } from 'typeorm-extension';
import {
  initializeTransactionalContext,
  addTransactionalDataSource,
} from 'typeorm-transactional';
require('dotenv').config();
initializeTransactionalContext();
let dataSourceInstance: DataSource | null = null;
export const dataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions & SeederOptions => ({
  type: 'postgres',
  host: 'database',
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),

  entities: ['dist/src/domain/**/*.entity.js'],
  synchronize: false, // this is
  migrationsTableName: 'custom_migration_table',
  migrations: ['dist/src/infrastructure/database/migrations/*{.ts,.js}'], // for migration create
  logging: true,
});

export const dataSource = (() => {
  if (!dataSourceInstance) {
    dataSourceInstance = new DataSource(dataSourceOptions(new ConfigService()));
    return addTransactionalDataSource(dataSourceInstance);
  }
  return dataSourceInstance;
})();

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

