import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogModule } from './log/log.module';
import { joiValidation } from './utils/joi.validation';
import { TypeOrmModule } from "@nestjs/typeorm";
import { connectionParams } from "./config/orm.config";
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { SceneryModule } from './scenery/scenery.module';
import { NotificationModule } from './notification/notification.module';
import { InformationModule } from './information/information.module';

const envVariablePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [envVariablePath, '.env'],
      // 校验环境变量
      validationSchema: joiValidation,
    }),
    TypeOrmModule.forRoot(connectionParams),
    LogModule,
    UserModule,
    RoleModule,
    SceneryModule,
    NotificationModule,
    InformationModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
