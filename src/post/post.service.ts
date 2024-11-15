import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePublicationDto } from "./dto/update-post.dto";
import { CreateCommentDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "src/schemas/post.schema";
import { Model } from "mongoose";
import { GetPostDto } from "./dto/get-post.dto";
import { SortPublication } from "./post.controller";

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost(dto: CreatePostDto, authorId: string) {
    const post = new this.postModel({
      author_id: authorId,
      content: dto.content,
      post_title: dto.post_title,
    });
    await post.save();
    return "Post created";
  }

  async createComment(dto: CreateCommentDto) {
    const comment = new this.postModel(dto);
    await comment.save();
    return "Comment created";
  }

  async getAllPosts() {
    return this.postModel.find();
  }

  async getPosts(
    dto: GetPostDto,
    skip: number,
    take: number,
    sort: SortPublication,
  ) {
    switch (sort) {
      case "date":
        return await this.postModel
          .aggregate([
            { $match: { post_title: { $exists: true, $ne: null } } },
            { $sort: { created_at: -1 } },
            { $skip: Number(skip) },
            { $limit: Number(take) },
          ])
          .exec();
      case "popularity":
        return await this.postModel
          .aggregate([
            { $match: { post_title: { $exists: true, $ne: null } } },
            {
              $addFields: {
                like_dislike_count: {
                  $add: ["$like_count", "$dislike_count"],
                },
              },
            },
            { $sort: { like_dislike_count: -1 } },
            { $project: { like_dislike_count: 0 } },
            { $skip: Number(skip) },
            { $limit: Number(take) },
          ])
          .exec();
      default:
        break;
    }
  }

  async getComments(
    sort: SortPublication,
    postId: string,
    skip: number,
    take: number,
  ) {
    const parent = await this.postModel.findById(postId);
    if (!parent) {
      throw new NotFoundException("Parent post not found");
    }
    switch (sort) {
      case "date":
        return await this.postModel
          .aggregate([
            { $match: { parent_id: { $exists: true, $ne: null } } },
            { $match: { parent_id: postId } },
            { $sort: { created_at: -1 } },
            { $skip: Number(skip) },
            { $limit: Number(take) },
          ])
          .exec();

      case "popularity":
        return await this.postModel
          .aggregate([
            { $match: { parent_id: { $exists: true, $ne: null } } },
            {
              $addFields: {
                like_dislike_count: {
                  $add: ["$like_count", "$dislike_count"],
                },
              },
            },
            { $sort: { like_dislike_count: -1 } },
            { $project: { like_dislike_count: 0 } },
            { $skip: Number(skip) },
            { $limit: Number(take) },
          ])
          .exec();
      default:
        break;
    }
  }

  async updatePublication(publicationId: string, dto: UpdatePublicationDto) {
    const publication = await this.postModel.findById(publicationId).exec();
    if (!publication) {
      throw new NotFoundException("Publication not found");
    }
    const res = await publication.updateOne(dto);
    return "Publication updated";
  }

  async deletePublication(publicationId: string) {
    const publication = await this.postModel.findById(publicationId).exec();
    if (!publication) {
      throw new NotFoundException("Publication not found");
    }
    const res = publication.deleteOne();
    return "Post deleted";
  }
}

// @Injectable()
// export class PostService {
//   constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

//   async createPost(dto: CreatePostDto) {
//     try {
//       const newPost = new this.postModel(dto);
//       const createdPost = await newPost.save();
//       return { message: "Post Created" };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async createComment(dto: CreateCommentDto) {
//     try {
//       const parentPost = await this.postModel.findById(dto.parent_id).exec();
//       if (parentPost == null || undefined) {
//         throw new UnauthorizedException("the parent Post does not exist");
//       }
//       const newComment = new this.postModel(dto);
//       const createdComment = newComment.save();
//       return { message: "Comment Created" };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async mostPopularPosts(skip: number, take: number) {
//     try {
//       const items = await this.postModel
//         .aggregate([
//           { $match: { post_title: { $exists: true, $ne: null } } },
//           {
//             $addFields: {
//               likesDislikesCount: {
//                 $add: [
//                   { $size: "$user_has_liked" },
//                   { $size: "$user_has_disliked" },
//                 ],
//               },
//               likeCount: { $size: "$user_has_liked" },
//               dislikeCount: { $size: "$user_has_disliked" },
//             },
//           },
//           { $sort: { likesDislikesCount: -1 } },
//           { $project: { likesDislikesCount: 0 } },
//           { $skip: Number(skip) },
//           { $limit: Number(take) },
//         ])
//         .exec();
//       const total = await this.postModel.countDocuments();
//       return { items, total };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async lastPostsFromUser(userId: string, skip: number, take: number) {
//     try {
//       const matchStage = userId ? { author_id: userId } : {};
//       const items = await this.postModel
//         .aggregate([
//           { $match: matchStage },
//           { $sort: { createdAt: -1 } },
//           { $skip: Number(skip) },
//           { $limit: Number(take) },
//         ])
//         .exec();
//       const total = await this.postModel
//         .find({ author_id: userId })
//         .countDocuments();

//       return {
//         items,
//         total,
//       };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async topCommentsFromPost(postId: string, skip: number, take: number) {
//     try {
//       const matchStage = { author_id: new Types.ObjectId(postId) };
//       const items = await this.postModel
//         .aggregate([
//           { $match: matchStage },
//           {
//             $addFields: {
//               likesDislikesCount: {
//                 $add: [
//                   { $size: "$user_has_liked" },
//                   { $size: "$user_has_disliked" },
//                 ],
//               },
//             },
//           },
//           { $sort: { likesDislikesCount: -1 } },
//           { $skip: Number(skip) },
//           { $limit: Number(take) },
//         ])
//         .exec();
//       const total = await this.postModel.countDocuments();

//       return {
//         items,
//         total,
//       };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async lastCommentsFromPost(postId: string, skip: number, take: number) {
//     try {
//       const matchStage = { author_id: new Types.ObjectId(postId) };
//       const items = await this.postModel
//         .aggregate([
//           { $match: matchStage },
//           { $sort: { createdAt: -1 } },
//           { $skip: Number(skip) },
//           { $limit: Number(take) },
//         ])
//         .exec();
//       const total = await this.postModel.countDocuments();

//       return {
//         items,
//         total,
//       };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async update(id: string, dto: UpdatePublicationDto) {
//     try {
//       const updatedPost = await this.postModel
//         .findByIdAndUpdate(id, dto, {
//           new: true,
//           runValidators: true,
//         })
//         .exec();
//       if (!updatedPost) {
//         throw new NotFoundException(`Post with ID ${id} not found`);
//       }
//       return { updated: updatedPost };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }

//   async remove(postId: string, userId: string) {
//     try {
//       const result = await this.postModel
//         .findOneAndDelete({
//           _id: new Types.ObjectId(postId),
//           author_id: userId,
//         })
//         .exec();
//       if (!result) {
//         throw new NotFoundException(`Post with ID ${postId} not found`);
//       }
//       return { message: `Post with ID ${postId} is deleted` };
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// }
