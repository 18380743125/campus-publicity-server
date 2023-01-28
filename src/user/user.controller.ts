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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':name')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
