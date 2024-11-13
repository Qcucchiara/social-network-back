// import { Test, TestingModule } from "@nestjs/testing";
// import { PostController } from "./post.controller";
// import { PostService } from "./post.service";
// import { JwtGuard } from "src/auth/guards";
// import { CreatePostDto } from "./dto/create-post.dto";
// import { CreateCommentDto } from "./dto/create-comment.dto";
// import { UpdatePostDto } from "./dto/update-post.dto";

// describe("PostController", () => {
//   let controller: PostController;
//   let service: PostService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PostController],
//       providers: [
//         {
//           provide: PostService,
//           useValue: {
//             createPost: jest.fn(),
//             createComment: jest.fn(),
//             mostPopularPosts: jest.fn(),
//             lastPostsFromUser: jest.fn(),
//             topCommentsFromPost: jest.fn(),
//             lastCommentsFromPost: jest.fn(),
//             update: jest.fn(),
//             remove: jest.fn(),
//           },
//         },
//       ],
//     })
//       .overrideGuard(JwtGuard)
//       .useValue({ canActivate: () => true })
//       .compile();

//     controller = module.get<PostController>(PostController);
//     service = module.get<PostService>(PostService);
//   });

//   it("should be defined", () => {
//     expect(controller).toBeDefined();
//   });

//   describe("createPost", () => {
//     it("should call createPost on the service", async () => {
//       const createPostDto: CreatePostDto = {
//         author_id: "author_id",
//         post_title: "Post title",
//         content: "Post content",
//       };
//       await controller.createPost(createPostDto);
//       expect(service.createPost).toHaveBeenCalledWith(createPostDto);
//     });
//   });

//   describe("createComment", () => {
//     it("should call createComment on the service", async () => {
//       const createCommentDto: CreateCommentDto = {
//         parent_id: "1",
//         content: "Comment content",
//         author_id: "author_id",
//       };
//       await controller.createComment(createCommentDto);
//       expect(service.createComment).toHaveBeenCalledWith(createCommentDto);
//     });
//   });

//   describe("mostPopularPosts", () => {
//     it("should call mostPopularPosts on the service", async () => {
//       const skip = 0;
//       const take = 10;
//       await controller.mostPopularPosts(skip, take);
//       expect(service.mostPopularPosts).toHaveBeenCalledWith(skip, take);
//     });
//   });

//   describe("lastPostsFromUser", () => {
//     it("should call lastPostsFromUser on the service", async () => {
//       const userId = "user123";
//       const skip = 0;
//       const take = 10;
//       await controller.lastPostsFromUser(userId, skip, take);
//       expect(service.lastPostsFromUser).toHaveBeenCalledWith(
//         userId,
//         skip,
//         take,
//       );
//     });
//   });

//   describe("topCommentsFromPost", () => {
//     it("should call topCommentsFromPost on the service", async () => {
//       const postId = "post123";
//       const skip = 0;
//       const take = 5;
//       await controller.topCommentsFromPost(postId, skip, take);
//       expect(service.topCommentsFromPost).toHaveBeenCalledWith(
//         postId,
//         skip,
//         take,
//       );
//     });
//   });

//   describe("lastCommentsFromPost", () => {
//     it("should call lastCommentsFromPost on the service", async () => {
//       const postId = "post123";
//       const skip = 0;
//       const take = 5;
//       await controller.lastCommentsFromPost(postId, skip, take);
//       expect(service.lastCommentsFromPost).toHaveBeenCalledWith(
//         postId,
//         skip,
//         take,
//       );
//     });
//   });

//   describe("update", () => {
//     it("should call update on the service", async () => {
//       const postId = "post123";
//       const updatePostDto: UpdatePostDto = {
//         post_title: "Updated title",
//         content: "Updated content",
//       };
//       await controller.update(postId, updatePostDto);
//       expect(service.update).toHaveBeenCalledWith(postId, updatePostDto);
//     });
//   });

//   describe("remove", () => {
//     it("should call remove on the service", async () => {
//       const postId = "post123";
//       const user = { id: "user123" };
//       await controller.remove(postId, user);
//       expect(service.remove).toHaveBeenCalledWith(postId, user.id);
//     });
//   });
// });
