import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";
import { LikeDislikeModule } from "./like-dislike/like-dislike.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { FollowModule } from "./follow/follow.module";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "../.env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PostModule,
    UserModule,
    LikeDislikeModule,
    AuthModule,
    PrismaModule,
    FollowModule,
  ],
})
export class AppModule {}
