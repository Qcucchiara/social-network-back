import { Controller, Get, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Get()
  login(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
