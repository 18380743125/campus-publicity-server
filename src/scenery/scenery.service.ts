import { Injectable } from '@nestjs/common';
import { CreateSceneryDto } from './dto/create-scenery.dto';
import { UpdateSceneryDto } from './dto/update-scenery.dto';
import { Scenery } from './entities/scenery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SceneryImages } from './entities/scenery-images.entity';

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

  findAll(page = 1, limit = 10) {
    return this.sceneryRepository.find({
      take: limit,
      skip: (page - 1) * limit,
      relations: {
        sceneryImages: true,
      },
    });
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
    return this.sceneryRepository.delete(id);
  }
}
