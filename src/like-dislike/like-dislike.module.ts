import { Module } from "@nestjs/common";
import { LikeDislikeService } from "./like-dislike.service";
import { LikeDislikeController } from "./like-dislike.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Post, PostSchema } from "src/schemas/post.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [LikeDislikeController],
  providers: [LikeDislikeService],
})
export class LikeDislikeModule {}
