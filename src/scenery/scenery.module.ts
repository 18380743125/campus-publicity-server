import { Module } from '@nestjs/common';
import { SceneryService } from './scenery.service';
import { SceneryController } from './scenery.controller';

@Module({
  controllers: [SceneryController],
  providers: [SceneryService]
})
export class SceneryModule {}
