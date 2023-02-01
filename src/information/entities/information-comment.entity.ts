import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Information } from './information.entity';

@Entity()
export class InformationComment {
  @PrimaryGeneratedColumn({ comment: '资讯评论ID' })
  id: number;

  @Column({ length: 200, comment: '资讯评论内容' })
  content: string;

  @Column({ nullable: true, comment: '父级评论ID' })
  parent_id: number;

  @ManyToOne(() => User, (user) => user.informationComment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Information, (information) => information.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  information: Information;

  @CreateDateColumn({ comment: '创建时间' })
  createAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateAt: Date;
}
