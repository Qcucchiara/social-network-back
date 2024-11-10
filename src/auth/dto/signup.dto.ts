import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class SignupDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  password: string;

  // @IsOptional()
  // @MinLength(3)
  // @MaxLength(20)
  // @IsString()
  // first_name: string;

  // @IsOptional()
  // @MinLength(3)
  // @MaxLength(20)
  // @IsString()
  // last_name: string;

  // @IsOptional()
  // avatar_name: string;

  // @IsOptional()
  // banner_image_name: string;
}
