import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SceneryService } from './scenery.service';
import { CreateSceneryDto } from './dto/create-scenery.dto';
import { UpdateSceneryDto } from './dto/update-scenery.dto';

@Controller('scenery')
export class SceneryController {
  constructor(private readonly sceneryService: SceneryService) {}

  @Post()
  create(@Body() createSceneryDto: CreateSceneryDto) {
    return this.sceneryService.create(createSceneryDto);
  }

  @Get()
  findAll() {
    return this.sceneryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sceneryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSceneryDto: UpdateSceneryDto) {
    return this.sceneryService.update(+id, updateSceneryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sceneryService.remove(+id);
  }
}
