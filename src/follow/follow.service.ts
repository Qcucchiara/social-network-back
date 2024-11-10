import { Injectable } from '@nestjs/common';
@Injectable()
export class FollowService {
  create(userId: string, followId: string) {
    return 'This action adds a new follow';
  }

  findAllFromUser(userId) {
    return `This action returns all follow`;
  }

  remove(id: string) {
    return `This action removes a #${id} follow`;
  }
}
