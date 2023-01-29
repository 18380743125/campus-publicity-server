import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { User } from './entities/user.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

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

  @Get()
  async findAll(@Query() dto) {
    const { page, limit, name } = dto;
    const result = await this.usersService.findAll(page, limit, name);
    return {
      code: 200,
      data: result,
    };
  }

  @Get(':name')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const result = await this.usersService.update(+id, dto);
    return {
      code: 0,
      data: result,
    };
  }
}
