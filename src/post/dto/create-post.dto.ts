import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  content: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  post_title: string;

  @IsOptional()
  @IsString({ each: true })
  @MaxLength(30)
  post_list_tags: string[];
}
