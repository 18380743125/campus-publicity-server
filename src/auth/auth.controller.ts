import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Request,
  Response,
  UseInterceptors,
} from '@nestjs/common';
import * as argon2 from 'argon2';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() params) {
    const { name, password } = params;
    const user = await this.userService.findOne(name);
    let isMatch = false;
    if (user) isMatch = await argon2.verify(user?.password, password);
    if (!isMatch || !user) {
      return {
        code: 1,
        message: '用户名或密码错误~',
      };
    }
    // 颁发 token
    const result = await this.authService.generateToken(user);
    return {
      code: 0,
      data: {
        token: result,
        user,
      },
    };
  }
}
