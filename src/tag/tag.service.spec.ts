import { Test, TestingModule } from "@nestjs/testing";
import { TagService } from "./tag.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UnauthorizedException } from "@nestjs/common";

describe("TagService", () => {
  let tagService: TagService;
  let prismaService: PrismaService;

  const mockTags = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Science" },
    { id: 3, name: "Health" },
  ];

  const mockPrismaService = {
    tag: {
      findMany: jest.fn().mockResolvedValue(mockTags),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    tagService = module.get<TagService>(TagService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(tagService).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of tags", async () => {
      const result = await tagService.findAll();
      expect(result).toEqual(mockTags);
      expect(prismaService.tag.findMany).toHaveBeenCalled();
    });

    it("should throw UnauthorizedException if findMany fails", async () => {
      jest.spyOn(prismaService.tag, "findMany").mockRejectedValue(new Error());

      await expect(tagService.findAll()).rejects.toThrow(UnauthorizedException);
    });
  });
});
