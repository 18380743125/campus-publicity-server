import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { Role } from '../role/entities/role.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    user.roles = await this.roleRepository.find({
      where: {
        id: In(user.roles),
      },
    });
    const userTemp = await this.userRepository.create(user);
    // 使用 argon2 对密码进行加密
    try {
      userTemp.password = await argon2.hash(userTemp.password.toString());
    } catch (err) {
      console.log(err);
    }
    return this.userRepository.save(userTemp);
  }

  async findAll(page: number = 1, limit: number = 10, name = null) {
    const qb = this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.roles', 'roles')
      .andWhere('roles.id = :roleId', { roleId: 2 });
    if (!!name) qb.andWhere('user.name LIKE :name', { name: `%${name}%` });
    const totalCount = await qb.getCount();
    const users = await qb
      .orderBy('user.createAt', 'DESC')
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();
    return { totalCount, users };
  }

  async findOne(name: string) {
    return this.userRepository.findOne({
      where: { name },
      relations: { roles: true },
    });
  }

  async update(id: number, dto: any) {
    const user = await this.userRepository.findOne({ where: { id } });
    for (let key of Object.keys(dto)) {
      if (user[key] !== undefined) user[key] = dto[key];
    }
    user.updateAt = new Date();
    return this.userRepository.update(id, user);
  }
}
