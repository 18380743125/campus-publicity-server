import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { InformationComment } from '../../information/entities/information-comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ comment: '用户ID' })
  id: number;

  @Column({ unique: true, length: 32, comment: '用户名' })
  name: string;

  @Column({ length: 64, comment: '密码' })
  password: string;

  @Column({ length: 1, default: 0, comment: '性别' })
  gender: string;

  @Column({ default: 1, comment: '年龄' })
  age: number;

  @Column({ default: false, comment: '是否可用' })
  banned: boolean;

  @ManyToMany(() => Role, (role) => role.users, {
    cascade: ['insert'],
  })
  @JoinTable({ name: 'user_role' })
  roles: Role[];

  @OneToMany(
    () => InformationComment,
    (informationComment) => informationComment.user,
    { cascade: true },
  )
  informationComment: InformationComment[]

  @CreateDateColumn({ comment: '创建时间' })
  createAt: Date;

  @UpdateDateColumn({ comment: '更新时间' })
  updateAt: Date;
}
