import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  findOne(id: number) {
    return this.roleRepository.findOne({
      where: {
        id,
      },
    });
  }
}
