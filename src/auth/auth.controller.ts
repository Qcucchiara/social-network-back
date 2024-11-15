import { Controller, Get, Post, Body, HttpCode } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDto, SignupDto } from "./dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  register(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
  @HttpCode(200)
  @Post("/login")
  login(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
