import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FollowService } from './follow.service';
import { GetUser } from 'src/auth/decorator';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':follow_id')
  create(@GetUser() user, @Param('follow_id') followId: string) {
    return this.followService.create(user.id, followId);
  }

  @Get()
  findAllFromUser(@GetUser() user) {
    return this.followService.findAllFromUser(user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followService.remove(id);
  }
}
