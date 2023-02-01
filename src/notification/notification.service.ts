import { Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}
  create(dto: any) {
    const notification = new Notification();
    notification.title = dto.title;
    notification.content = dto.content;
    notification.remarks = dto.remarks;
    return this.notificationRepository.save(notification);
  }

  async findAll(page = 1, limit = 10) {
    const totalCount = await this.notificationRepository.count();
    const data = await this.notificationRepository.find({
      order: {
        createAt: 'DESC'
      },
      take: limit,
      skip: (page - 1) * limit,
    });
    return {
      data,
      totalCount,
    };
  }

  async findOne(id: number) {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    if (notification) {
      notification.count++;
      this.notificationRepository.update(id, notification);
    }
    return notification;
  }

  async update(id: number, dto: any) {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    for (let key of Object.keys(dto)) {
      if (notification[key] !== undefined) notification[key] = dto[key];
    }
    notification.updateAt = new Date();
    return this.notificationRepository.update(id, notification);
  }

  async remove(id: number) {
    return this.notificationRepository.delete(id);
  }
}
