import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from "argon2";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RoleUser } from "@prisma/client";
import { SigninDto, SignupDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: SignupDto) {
    const exisingUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (exisingUser) {
      throw new ForbiddenException("Email already taken");
    }

    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: hash,
        is_active: true,
        role: RoleUser.USER,
        gdpr_date: new Date(),
      },
    });

    return { token: this.signToken(user.id), message: "Connected" };
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.identifier }, { username: dto.identifier }],
      },
    });
    if (!user) {
      throw new ForbiddenException("Invalid crendentials");
    }

    const isValidPassword = await argon.verify(user.password, dto.password);
    if (!isValidPassword) {
      throw new ForbiddenException("Invalid crendentials");
    }

    return { token: await this.signToken(user.id), message: "Connected" };
  }

  private async signToken(userId: string): Promise<string> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get("JWT_SECRET");
    const token = await this.jwt.signAsync(payload, {
      expiresIn: "7d",
      secret: secret,
    });

    return token;
  }
}
