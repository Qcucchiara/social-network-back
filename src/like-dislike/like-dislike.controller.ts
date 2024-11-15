import { Controller, Post, Param, Delete, UseGuards } from "@nestjs/common";
import { LikeDislike, LikeDislikeService } from "./like-dislike.service";
import { JwtGuard } from "src/auth/guards";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";

@UseGuards(JwtGuard)
@Controller("like-dislike")
export class LikeDislikeController {
  constructor(private readonly likeDislikeService: LikeDislikeService) {}

  @Post(":publication_id/:is_liked")
  create(
    @Param("publication_id") publicationsId: string,
    @Param("is_liked") isLiked: LikeDislike,
    @GetUser("id") userId: string,
  ) {
    return this.likeDislikeService.create(publicationsId, isLiked, userId);
  }

  @Delete(":publication_id")
  remove(
    @Param("publication_id") publicationsId: string,
    @GetUser("id") userId: string,
  ) {
    return this.likeDislikeService.remove(publicationsId, userId);
  }
}
