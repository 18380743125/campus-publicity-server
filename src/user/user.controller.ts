import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { User } from './entities/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  // 用户注册
  @Post()
  async create(@Body(CreateUserPipe) createUserDto: CreateUserDto) {
    const user = createUserDto as User;
    const result = await this.usersService.create(user);
    return {
      code: 0,
      message: '注册成功~',
      data: result,
    };
  }

  // 查询用户信息
  @Get()
  async findAll(@Query() dto) {
    const { page, limit, name } = dto;
    const result = await this.usersService.findAll(page, limit, name);
    return {
      code: 200,
      data: result,
    };
  }

  // 根据用户名查询用户
  @Get(':name')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  // 用户信息更改
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const result = await this.usersService.update(+id, dto);
    return {
      code: 0,
      data: result,
    };
  }
}
