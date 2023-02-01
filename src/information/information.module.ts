import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Information } from './entities/information.entity';
import { InformationImage } from './entities/information-image.entity';
import { InformationDetail } from './entities/information-detail.entity';
import { InformationComment } from './entities/information-comment.entity';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      User,
      Information,
      InformationImage,
      InformationDetail,
      InformationComment,
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: path.join(__dirname, '../images/information'),
        filename(_, file, cb) {
          const filename = `${uuidv4() + path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule {}
