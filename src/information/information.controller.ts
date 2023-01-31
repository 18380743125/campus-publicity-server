import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { InformationService } from './information.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InformationImage } from './entities/information-image.entity';
import { Information } from './entities/information.entity';
import { InformationDetail } from './entities/information-detail.entity';

@Controller('information')
export class InformationController {
  constructor(private readonly informationService: InformationService) {}

  // 上传信息图片
  @UseInterceptors(FileInterceptor('file'))
  @Post('/upload')
  async upload(@UploadedFile() file: Express.Multer.File) {
    const informationImage = new InformationImage();
    informationImage.filename = file.filename;
    informationImage.mimetype = file.mimetype;
    informationImage.size = file.size;
    let errno = 0;
    let url = `http://localhost:8000/information/${file.filename}`;
    try {
      await this.informationService.upload(informationImage);
    } catch (err) {
      console.log(err);
      url = '';
      errno = 1;
    }
    return {
      errno,
      data: { url },
    };
  }

  @Post()
  async create(@Body() dto: any) {
    const { title, content } = dto;
    const information = new Information();
    information.title = title;
    const detail = new InformationDetail();
    detail.content = content;
    information.informationDetail = detail;
    const result = await this.informationService.create(information);
    return {
      code: 0,
      data: result,
    };
  }

  @Get()
  async findAll(@Query() dto: any) {
    const { page, size } = dto;
    const result = await this.informationService.findAll(page, size);
    return {
      code: 0,
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.informationService.findOne(+id);
    return {
      code: 0,
      data: result,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const result = await this.informationService.update(+id, dto);
    return {
      code: 0,
      result
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.informationService.remove(+id);
    return {
      code: 0,
      result,
    };
  }
}
