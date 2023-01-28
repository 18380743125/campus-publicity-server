import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SceneryService } from './scenery.service';
import { SceneryImages } from './entities/scenery-images.entity';
import { Scenery } from './entities/scenery.entity';

@Controller('scenery')
export class SceneryController {
  constructor(private readonly sceneryService: SceneryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('img'))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto,
  ) {
    const images: SceneryImages[] = [];
    for (const item of files) {
      const img = new SceneryImages();
      img.filename = item.filename;
      img.mimetype = item.mimetype;
      img.size = item.size;
      images.push(img);
    }
    const title = dto.title;
    const scenery = new Scenery();
    scenery.title = title;
    scenery.sceneryImages = images;
    const result = await this.sceneryService.create(scenery);
    return {
      code: 0,
      message: '添加成功~',
      data: result,
    };
  }

  @Get()
  async findAll(@Query() params) {
    const { page, limit } = params;
    const result = await this.sceneryService.findAll(page, limit);
    return {
      code: 0,
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.sceneryService.findOne(+id);
    return {
      code: 0,
      data: result,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.sceneryService.remove(+id);
    return {
      code: 0,
      message: '删除成功~',
      data: result,
    };
  }
}
