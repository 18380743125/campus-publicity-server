import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
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

  findAll() {
    return `This action returns all users`;
  }

  async findOne(name: string) {
    return this.userRepository.findOne({
      where: { name },
      relations: { roles: true },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
