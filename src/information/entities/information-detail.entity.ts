import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Information } from './information.entity';

@Entity()
export class InformationDetail {
  @PrimaryGeneratedColumn({ comment: '资讯详情ID' })
  id: number;

  @Column({ type: 'mediumtext', comment: '资讯内容' })
  content: string;

  @Column({ default: 0, comment: '浏览次数' })
  view_count: number;

  @OneToOne(() => Information, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  information: Information;

  @CreateDateColumn({ comment: '创建时间' })
  createAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateAt: Date;
}
