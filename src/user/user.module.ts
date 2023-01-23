import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "../role/entities/role.entity";
import { User } from "./entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
