import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() dto: any) {
    dto.remarks = '重庆移通学院教务处';
    const result = await this.notificationService.create(dto);
    return {
      code: 0,
      data: result,
    };
  }

  @Get()
  async findAll(@Query() dto) {
    const { page, limit } = dto;
    const result = await this.notificationService.findAll(page, limit);
    return {
      code: 0,
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.notificationService.findOne(+id);
    return {
      code: 0,
      result,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const result = await this.notificationService.update(+id, dto);
    return {
      code: 0,
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.notificationService.remove(+id);
    return {
      code: 0,
      data: result,
    };
  }
}
