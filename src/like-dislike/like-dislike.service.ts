import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "src/schemas/post.schema";

export type LikeDislike = "like" | "dislike";

@Injectable()
export class LikeDislikeService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(publicationId: string, isLiked: LikeDislike, userId: string) {
    this.remove(publicationId, userId);
    switch (isLiked) {
      case "like":
        return this.postModel.findByIdAndUpdate(publicationId, {
          $inc: { like_count: 1 },
          $push: { user_has_liked: userId },
        });

      case "dislike":
        return this.postModel.findByIdAndUpdate(publicationId, {
          $inc: { dislike_count: 1 },
          $push: { user_has_disliked: userId },
        });
      default:
        break;
    }
  }

  async remove(publicationId: string, userId: string) {
    const post = await this.postModel.findById(publicationId);
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    const hasLiked = post.user_has_liked.includes(userId);
    const hasDisliked = post.user_has_disliked.includes(userId);

    if (hasLiked) {
      await this.postModel.findByIdAndUpdate(publicationId, {
        $pull: { user_has_liked: userId },
        $inc: { like_count: -1 },
      });
    } else if (hasDisliked) {
      await this.postModel.findByIdAndUpdate(publicationId, {
        $pull: { user_has_disliked: userId },
        $inc: { dislike_count: -1 },
      });
    }
    return "Reaction deleted";
  }
}
