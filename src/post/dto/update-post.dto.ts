import { IsOptional, IsString, MaxLength } from "class-validator";

export class UpdatePublicationDto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  content: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  post_title: string;
}
