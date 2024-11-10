import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  parent_id: string;

  @IsNotEmpty()
  @IsUUID()
  author_id: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
