import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigEnum } from '../enum/config.enum';

function getEnv(filepath: string) {
  if (fs.existsSync(filepath)) {
    return dotenv.parse(fs.readFileSync(filepath));
  }
  return {};
}

function buildConnectionOptions() {
  const defaultConfig = getEnv(path.join('.env'));
  const envConfig = getEnv(
    path.join(`.env.${process.env.NODE_ENV || 'development'}`),
  );
  const config = { ...defaultConfig, ...envConfig };
  const entitiesDir =
    process.env.NODE_ENV === 'test'
      ? [path.join(__dirname, '../**/*.entity.ts')]
      : [path.join(__dirname, '../**/*.entity{.js,.ts}')];
  const logFlag = config['LOG_ON'] === 'true';
  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: entitiesDir,
    synchronize: Boolean(config[ConfigEnum.DB_SYNC]),
    logging: logFlag && process.env.NODE_ENV === 'development',
    retryDelay: 60000,
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnectionOptions();

export default new DataSource({
  ...connectionParams,
  migrations: ['../migrations/**/*'],
  subscribers: [],
} as DataSourceOptions);
