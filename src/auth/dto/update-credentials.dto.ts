import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ChangeCredentialsDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  username: string;
  // email: string
  // old_password: string
  // new_password: string
  // avatar_name: string;
  // banner_image_name: string;

  @IsOptional()
  @IsBoolean()
  gdpr: boolean;
}
