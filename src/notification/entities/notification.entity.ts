import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn({ comment: '公告ID' })
  id: number;

  @Column({ unique: true, length: 40, comment: '公告标题' })
  title: string;

  @Column({ comment: '公共内容' })
  content: string;

  @Column({ length: 30, comment: '公共备注' })
  remarks: string

  @CreateDateColumn({ comment: '创建时间' })
  createAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateAt: Date;
}
