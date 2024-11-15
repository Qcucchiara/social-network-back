import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PostDocument = HydratedDocument<Post>;

enum PostStatus {
  VISIBLE = "VISIBLE",
  SUSPECT = "SUSPECT",
  HIDDEN = "HIDDEN",
}

@Schema({ timestamps: true })
export class Post {
  @Prop({ type: String })
  parent_id: string;

  @Prop({ type: String })
  author_id: string;

  @Prop({ type: String })
  content: string;

  @Prop({
    type: String,
    enum: PostStatus,
    default: PostStatus.VISIBLE,
  })
  status: string;

  @Prop({ type: [String], default: [] })
  user_has_liked: string[];

  @Prop({ type: Number, default: 0 })
  like_count: number;

  @Prop({ type: [String], default: [] })
  user_has_disliked: string[];

  @Prop({ type: Number, default: 0 })
  dislike_count: number;

  @Prop({ type: String })
  post_title: string;

  @Prop({ type: [String], default: [] })
  post_list_tags: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
