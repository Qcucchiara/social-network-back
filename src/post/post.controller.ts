import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpCode,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { CreateCommentDto, UpdatePublicationDto } from "./dto";
// import { GetUser } from "src/auth/decorator";
import { JwtGuard } from "src/auth/guards";
import { GetPostDto } from "./dto/get-post.dto";
import { GetUser } from "src/auth/decorator";

const sortPublication = ["date", "popularity"] as const;
export type SortPublication = (typeof sortPublication)[number];

// @UseGuards(JwtGuard)
@Controller("publication")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post("/post")
  createPost(@Body() dto: CreatePostDto, @GetUser("sub") authorId: string) {
    return this.postService.createPost(dto, authorId);
  }

  @Post("/comment")
  createComment(@Body() dto: CreateCommentDto) {
    return this.postService.createComment(dto);
  }

  @HttpCode(200)
  @Post("/post/:skip/:take/:sort")
  getPosts(
    @Body() dto: GetPostDto,
    @Param("skip") skip: number,
    @Param("take") take: number,
    @Param("sort") sort: SortPublication,
  ) {
    return this.postService.getPosts(dto, skip, take, sort);
  }

  @HttpCode(200)
  @Post("/comment/:post_id/:skip/:take/:sort")
  getComments(
    @Param("sort") sort: SortPublication,
    @Param("post_id") postId: string,
    @Param("skip") skip: number,
    @Param("take") take: number,
  ) {
    return this.postService.getComments(sort, postId, skip, take);
  }

  @Patch(":publication_id")
  updatePublication(
    @Body() dto: UpdatePublicationDto,
    @Param("publication_id") publicationId: string,
  ) {
    return this.postService.updatePublication(publicationId, dto);
  }

  @Delete(":publication_id")
  deletePublication(@Param("publication_id") publicationId: string) {
    return this.postService.deletePublication(publicationId);
  }

  // _________________________________________________________________
  // @Post("/post")
  // createPost(@Body() createPostDto: CreatePostDto) {
  //   return this.postService.createPost(createPostDto);
  // }

  // @Post("/comment")
  // createComment(@Body() createCommentDto: CreateCommentDto) {
  //   return this.postService.createComment(createCommentDto);
  // }

  // @Get("/post/top/:skip/:take")
  // mostPopularPosts(
  //   @Param("skip") skip: number,
  //   @Param("take") take: number,
  //   // @GetUser() user,
  // ) {
  //   return this.postService.mostPopularPosts(skip, take);
  // }

  // @Get("/post/last/:user_id/:skip/:take")
  // lastPostsFromUser(
  //   @Param("user_id") userId: string,
  //   @Param("skip") skip: number,
  //   @Param("take") take: number,
  // ) {
  //   return this.postService.lastPostsFromUser(userId, skip, take);
  // }

  // @Get("/comment/top/:post_id/:skip/:take")
  // topCommentsFromPost(
  //   @Param("post_id") postId: string,
  //   @Param("skip") skip: number,
  //   @Param("take") take: number,
  // ) {
  //   return this.postService.topCommentsFromPost(postId, skip, take);
  // }

  // @Get("/comment/last/:post_id/:skip/:take")
  // lastCommentsFromPost(
  //   @Param("post_id") postId: string,
  //   @Param("skip") skip: number,
  //   @Param("take") take: number,
  // ) {
  //   return this.postService.lastCommentsFromPost(postId, skip, take);
  // }

  // @Patch(":post_id")
  // update(
  //   @Param("post_id") id: string,
  //   @Body() updatePostDto: UpdatePublicationDto,
  // ) {
  //   return this.postService.update(id, updatePostDto);
  // }

  // @Delete(":post_id")
  // remove(@Param("post_id") postId: string, @GetUser() user) {
  //   return this.postService.remove(postId, user.id);
  // }
}
