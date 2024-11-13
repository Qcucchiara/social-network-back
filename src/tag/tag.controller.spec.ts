import { Test, TestingModule } from "@nestjs/testing";
import { TagController } from "./tag.controller";
import { TagService } from "./tag.service";

describe("TagController", () => {
  let tagController: TagController;
  let tagService: TagService;

  const mockTags = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Science" },
    { id: 3, name: "Health" },
  ];

  const mockTagService = {
    findAll: jest.fn().mockResolvedValue(mockTags),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagController],
      providers: [
        {
          provide: TagService,
          useValue: mockTagService,
        },
      ],
    }).compile();

    tagController = module.get<TagController>(TagController);
    tagService = module.get<TagService>(TagService);
  });

  it("should be defined", () => {
    expect(tagController).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of tags", async () => {
      const result = await tagController.findAll();
      expect(result).toEqual(mockTags);
      expect(tagService.findAll).toHaveBeenCalled();
    });
  });
});
