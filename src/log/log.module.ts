import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { Console } from 'winston/lib/winston/transports';
import { utilities } from 'nest-winston';
import { LogEnum } from '../enum/config.enum';

function createDailyRotateTransport(level: string, filename: string) {
  return new DailyRotateFile({
    level,
    dirname: 'log',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransport = new Console({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        });
        return {
          transports: [
            consoleTransport,
            ...(configService.get(LogEnum.LOG_ON)
              ? [
                  createDailyRotateTransport('info', 'info'),
                  createDailyRotateTransport('warn', 'error'),
                ]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class LogModule {}
