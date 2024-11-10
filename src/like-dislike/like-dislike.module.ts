import { Module } from '@nestjs/common';
import { LikeDislikeService } from './like-dislike.service';
import { LikeDislikeController } from './like-dislike.controller';

@Module({
  controllers: [LikeDislikeController],
  providers: [LikeDislikeService],
})
export class LikeDislikeModule {}
