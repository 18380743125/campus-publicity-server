import { Injectable } from '@nestjs/common';
import { Scenery } from './entities/scenery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SceneryImages } from './entities/scenery-images.entity';
import { delFile } from '../utils/file.util';
import * as path from 'path';

@Injectable()
export class SceneryService {
  constructor(
    @InjectRepository(Scenery) private sceneryRepository: Repository<Scenery>,
    @InjectRepository(SceneryImages)
    private sceneryImagesRepository: Repository<SceneryImages>,
  ) {}

  create(scenery: Scenery) {
    return this.sceneryRepository.save(scenery);
  }

  async findAll(page = 1, limit = 10) {
    const result = await this.sceneryRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: {
        sceneryImages: true,
      },
    });
    const totalCount = await this.sceneryRepository.count();
    return { result, totalCount };
  }

  async findOne(id: number) {
    const scenery = await this.sceneryRepository.findOne({
      where: { id },
      relations: { sceneryImages: true },
    });
    if (scenery) {
      scenery.hots++;
      await this.sceneryRepository.update(scenery.id, { hots: scenery.hots });
    }
    return scenery;
  }

  async remove(id: number) {
    const scenery = await this.findOne(id);
    // console.log(scenery);
    // 删除本地图标
    if (scenery) {
      for (const img of scenery.sceneryImages) {
        delFile(path.join(__dirname, '../images/scenery', img.filename));
      }
    }
    return this.sceneryRepository.delete(id)
  }
}
