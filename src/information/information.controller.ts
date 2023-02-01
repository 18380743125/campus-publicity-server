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
  UseGuards,
  Req,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { InformationService } from './information.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { InformationImage } from './entities/information-image.entity';
import { Information } from './entities/information.entity';
import { InformationDetail } from './entities/information-detail.entity';
import { AuthGuard } from '@nestjs/passport';
import { InformationComment } from './entities/information-comment.entity';
import { UserService } from '../user/user.service';
import { AdminGuard } from '../guards/admin.guard';
import { processComment } from '../utils/comment.util';

@Controller('information')
export class InformationController {
  constructor(
    private readonly informationService: InformationService,
    private readonly userService: UserService,
  ) {}

  // 资讯评论模块
  // 发评论
  @Post('/comment')
  @UseGuards(AuthGuard('jwt'))
  async publishComment(@Req() req, @Body() dto: any) {
    const user = req.user;
    const { content, parent_id, informationId } = dto;
    const comment = new InformationComment();
    comment.content = content;
    comment.parent_id = parent_id;
    comment.user = await this.userService.findOne(user.name);
    comment.information = await this.informationService.findOne(informationId);
    const result = await this.informationService.publishComment(comment);
    return {
      code: 0,
      data: result,
    };
  }

  // 根据id删除评论
  @Delete('/comment')
  @UseGuards(AdminGuard)
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(@Body("ids") ids: number[]) {
    const result = await this.informationService.deleteComment(ids);
    return {
      code: 0,
      result,
    };
  }

  // 修改评论, 用户自己修改自己
  @Patch('/comment/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateComment(@Param('id') id, @Body() dto) {
    const { content } = dto;
    const result = await this.informationService.updateComment(id, content);
    return {
      code: 0,
      data: result,
    };
  }

  // 查询评论(informationId)
  @Get('/comment')
  @UseInterceptors(ClassSerializerInterceptor)
  async getComments(@Query() query) {
    const { informationId, page, size } = query;
    const result: any = await this.informationService.findComments(
      informationId,
      page,
      size,
    );
    return {
      code: 0,
      data: processComment(result.comments),
    };
  }

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

  // 发布资讯
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

  // 查询资讯信息
  @Get()
  async findAll(@Query() dto: any) {
    const { page, size } = dto;
    const result = await this.informationService.findAll(page, size);
    return {
      code: 0,
      data: result,
    };
  }

  // 根据 id 查询资讯信息
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.informationService.findOne(+id);
    return {
      code: 0,
      data: result,
    };
  }

  // 更新资讯信息
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const result = await this.informationService.update(+id, dto);
    return {
      code: 0,
      result,
    };
  }

  // 删除资讯
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.informationService.remove(+id);
    return {
      code: 0,
      result,
    };
  }
}
