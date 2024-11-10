import { Injectable } from '@nestjs/common';
import { LikeDislikeDto } from './dto/create-like-dislike.dto';

@Injectable()
export class LikeDislikeService {
  add(dto: LikeDislikeDto, userId: string, postId: string) {
    return 'check if a like or dislike already exist, if one in the opposite column already exist, remove it and add it in the other. else do nothing.';
  }

  remove(userId: string, postId: string) {
    return `remove the userId in the 2 columns if it exist. else do nothing`;
  }
}
