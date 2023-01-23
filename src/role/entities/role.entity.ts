import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ comment: '角色ID' })
  id: number;

  @Column({ length: 16, comment: '角色名称' })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
