import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PostModule } from "./post/post.module";
import { UserModule } from "./user/user.module";
import { LikeDislikeModule } from "./like-dislike/like-dislike.module";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { FollowModule } from "./follow/follow.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TagModule } from "./tag/tag.module";
import { config } from "dotenv";

config({ path: "./../.env" });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./../.env",
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // console.log(configService.get("MONGO_URL"));
        return {
          uri: configService.get<string>("MONGO_URL"),
        };
      },
    }),
    PostModule,
    UserModule,
    LikeDislikeModule,
    AuthModule,
    PrismaModule,
    FollowModule,
    TagModule,
  ],
})
export class AppModule {}
