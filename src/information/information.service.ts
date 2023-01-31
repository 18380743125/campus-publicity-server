import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InformationImage } from './entities/information-image.entity';
import { Repository } from 'typeorm';
import { Information } from './entities/information.entity';
import { InformationDetail } from './entities/information-detail.entity';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(Information)
    private informationRepository: Repository<Information>,
    @InjectRepository(InformationDetail)
    private detailRepository: Repository<InformationDetail>,
    @InjectRepository(InformationImage)
    private imageRepository: Repository<InformationImage>,
  ) {}

  // 保存图片信息
  upload(informationImage) {
    return this.imageRepository.save(informationImage);
  }

  create(dto: any) {
    return this.informationRepository.save(dto);
  }

  async findAll(page = 1, size = 5) {
    const count = await this.informationRepository.count();
    const result = await this.informationRepository.find({
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

  remove(id: number) {
    return this.informationRepository.delete(id);
  }
}
