import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InformationDetail } from './information-detail.entity';
import { InformationImages } from './information-images.entity';

@Entity()
export class Information {
  @PrimaryGeneratedColumn({ comment: '资讯ID' })
  id: number;

  @Column({ unique: true, length: 40, comment: '资讯标题' })
  title: string;

  @OneToOne(
    () => InformationDetail,
    (informationDetail) => informationDetail.information,
    { cascade: true },
  )
  informationDetail: InformationDetail;

  @OneToMany(
    () => InformationImages,
    (informationImages) => informationImages.information,
    { cascade: true },
  )
  informationImages: InformationImages[];

  @CreateDateColumn({ comment: '创建时间' })
  createAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateAt: Date;
}
