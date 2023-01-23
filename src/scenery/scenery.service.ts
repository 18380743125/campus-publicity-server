import { Injectable } from '@nestjs/common';
import { CreateSceneryDto } from './dto/create-scenery.dto';
import { UpdateSceneryDto } from './dto/update-scenery.dto';

@Injectable()
export class SceneryService {
  create(createSceneryDto: CreateSceneryDto) {
    return 'This action adds a new scenery';
  }

  findAll() {
    return `This action returns all scenery`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scenery`;
  }

  update(id: number, updateSceneryDto: UpdateSceneryDto) {
    return `This action updates a #${id} scenery`;
  }

  remove(id: number) {
    return `This action removes a #${id} scenery`;
  }
}
