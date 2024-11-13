import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
export class SigninDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
