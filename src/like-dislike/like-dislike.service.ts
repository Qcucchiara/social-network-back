import { Injectable } from "@nestjs/common";

export type LikeDislike = "like" | "dislike";

@Injectable()
export class LikeDislikeService {
  create(publicationId: LikeDislike, postId: string) {
    try {
      switch (publicationId) {
        case "like":
          return;

        case "dislike":
          return;

        default:
          break;
      }
    } catch (error) {}
  }

  remove(postId: string) {
    return `remove the userId in the 2 columns if it exist. else do nothing`;
  }
}
