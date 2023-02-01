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
import { InformationComment } from './information-comment.entity';

@Entity()
export class Information {
  @PrimaryGeneratedColumn({ comment: '资讯ID' })
  id: number;

  @Column({ length: 100, comment: '资讯标题' })
  title: string;

  @OneToOne(
    () => InformationDetail,
    (informationDetail) => informationDetail.information,
    { cascade: true },
  )
  informationDetail: InformationDetail;

  @OneToMany(
    () => InformationComment,
    (informationComment) => informationComment.information,
    { cascade: true },
  )
  comments: InformationComment[];

  @CreateDateColumn({ comment: '创建时间' })
  createAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateAt: Date;
}
