import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    try {
      return this.prisma.tag.findMany();
    } catch (error) {
      return new UnauthorizedException("tags not found");
    }
  }
}
