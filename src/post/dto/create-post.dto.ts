import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  // @IsUUID()
  author_id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  content: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  post_title: string;

  // post_list_tags: string[];
}
