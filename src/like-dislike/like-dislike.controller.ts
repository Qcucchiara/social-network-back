import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeDislikeService } from './like-dislike.service';
import { LikeDislikeDto } from './dto/create-like-dislike.dto';

@Controller('like-dislike')
export class LikeDislikeController {
  constructor(private readonly likeDislikeService: LikeDislikeService) {}

  @Post(':user_id/:post_id')
  add(
    @Body() likeDislikeDto: LikeDislikeDto,
    @Param('user_id') userId: string,
    @Param('user_id') postId: string,
  ) {
    return this.likeDislikeService.add(likeDislikeDto, userId, postId);
  }

  @Delete(':id')
  remove(@Param('user_id') userId: string, @Param('user_id') postId: string) {
    return this.likeDislikeService.remove(userId, postId);
  }
}
