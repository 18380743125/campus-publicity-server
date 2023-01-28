import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SceneryImages } from './scenery-images.entity';

@Entity()
export class Scenery {
  @PrimaryGeneratedColumn({ comment: '校园风光ID' })
  id: number;

  @Column({ unique: true, length: 40, comment: '校园风光标题' })
  title: string;

  @Column({ comment: '热度', default: 0 })
  hots: number;

  @OneToMany(() => SceneryImages, (sceneryImages) => sceneryImages.scenery, {
    cascade: true,
  })
  sceneryImages: SceneryImages[];

  @CreateDateColumn({ comment: '创建时间' })
  createAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateAt: Date;
}
