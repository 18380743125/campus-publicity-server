import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Scenery } from './scenery.entity';

@Entity()
export class SceneryImages {
  @PrimaryGeneratedColumn({ comment: '资讯图片ID' })
  id: number;

  @Column({ comment: '文件名' })
  filename: string;

  @Column({ length: 64, comment: 'mimetype' })
  mimetype: string;

  @Column({ comment: '字节数' })
  size: number;

  @ManyToOne(() => Scenery, (scenery) => scenery.sceneryImages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  scenery: Scenery;

  @CreateDateColumn({ comment: '创建时间' })
  createAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateAt: Date;
}
