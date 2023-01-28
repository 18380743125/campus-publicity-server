import { Module } from '@nestjs/common';
import { SceneryService } from './scenery.service';
import { SceneryController } from './scenery.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scenery } from './entities/scenery.entity';
import { SceneryImages } from './entities/scenery-images.entity';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname, '../images/scenery'),
        filename(_, file, cb) {
          const filename = `${uuidv4() + path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
    TypeOrmModule.forFeature([Scenery, SceneryImages]),
  ],
  controllers: [SceneryController],
  providers: [SceneryService],
})
export class SceneryModule {}
