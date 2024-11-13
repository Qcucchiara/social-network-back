import { Controller, Post, Param, Delete } from "@nestjs/common";
import { LikeDislike, LikeDislikeService } from "./like-dislike.service";

@Controller("like-dislike")
export class LikeDislikeController {
  constructor(private readonly likeDislikeService: LikeDislikeService) {}

  @Post(":publication_id/:is_liked")
  create(
    @Param("publication_id") publicationsId: string,
    @Param("is_liked") isLiked: LikeDislike,
  ) {
    return this.likeDislikeService.create(isLiked, publicationsId);
  }

  @Delete(":publication_id")
  remove(@Param("publication_id") publicationsId: string) {
    return this.likeDislikeService.remove(publicationsId);
  }
}
