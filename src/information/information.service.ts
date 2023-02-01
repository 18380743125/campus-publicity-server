import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationImage } from './entities/information-image.entity';
import { Repository } from 'typeorm';
import { Information } from './entities/information.entity';
import { InformationDetail } from './entities/information-detail.entity';
import { InformationComment } from './entities/information-comment.entity';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(Information)
    private informationRepository: Repository<Information>,
    @InjectRepository(InformationDetail)
    private detailRepository: Repository<InformationDetail>,
    @InjectRepository(InformationImage)
    private imageRepository: Repository<InformationImage>,
    @InjectRepository(InformationComment)
    private commentRepository: Repository<InformationComment>,
  ) {}

  // 发表评论
  async publishComment(dto: any) {
    return this.commentRepository.save(dto);
  }

  // 删除评论
  async deleteComment(ids: number[]) {
    return this.commentRepository.delete(ids);
  }

  // 根据 id 查询评论
  async findCommentById(id: number) {
    return this.commentRepository.findOne({ where: { id } });
  }

  // 查询评论(多条件查询 且关系)
  async findComments(informationId: number, page = 1, size = 100) {
    const qb = this.commentRepository.createQueryBuilder('comment');
    qb.leftJoinAndSelect('comment.user', 'user').leftJoinAndSelect(
      'user.roles',
      'roles',
    );
    qb.innerJoinAndSelect('comment.information', 'information').andWhere(
      'information.id = :informationId',
      {
        informationId,
      },
    );

    const count = await qb.getCount();
    const comments = await qb
      .take(size)
      .skip((page - 1) * size)
      .getMany();
    return {
      count,
      comments,
    };
  }

  // 修改评论
  async updateComment(id: number, content: string) {
    const comment = await this.findCommentById(id);
    if (!comment) return null;
    if (content) comment.content = content;
    comment.updateAt = new Date();
    return this.commentRepository.update(id, comment);
  }

  // 保存资讯图片信息
  upload(informationImage) {
    return this.imageRepository.save(informationImage);
  }

  // 创建资讯
  create(dto: any) {
    return this.informationRepository.save(dto);
  }

  // 查询资讯信息
  async findAll(page = 1, size = 5) {
    const count = await this.informationRepository.count();
    const result = await this.informationRepository.find({
      order: {
        createAt: 'DESC',
      },
      take: size,
      skip: (page - 1) * size,
      relations: {
        informationDetail: true,
      },
    });
    return {
      count,
      data: result,
    };
  }

  // 根据 id 查询资讯
  async findOne(id: number) {
    const information = await this.informationRepository.findOne({
      where: { id },
      relations: {
        informationDetail: true,
      },
    });
    if (information) {
      information.informationDetail.view_count++;
      await this.detailRepository.update(id, information.informationDetail);
    }
    return information;
  }

  // 更新资讯信息
  async update(id: number, dto: any) {
    try {
      const information = await this.findOne(id);
      if (!information) return null;
      const detail = information.informationDetail;
      delete information.informationDetail;
      const { title, content } = dto;
      if (content && detail) {
        detail.content = content;
        detail.updateAt = new Date();
        await this.detailRepository.update(detail.id, detail);
      }
      information.title = title;
      information.updateAt = new Date();
      return this.informationRepository.update(id, information);
    } catch (e) {
      console.log(e);
    }
  }

  // 删除资讯信息
  remove(id: number) {
    return this.informationRepository.delete(id);
  }
}
