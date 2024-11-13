import { IsIn, IsOptional, IsString, IsUUID } from "class-validator";

const sortQuery = ["date", "popularity"] as const;
export type SortQuery = (typeof sortQuery)[number];

export class GetPostDto {
  @IsOptional()
  @IsUUID("all", { each: true })
  authorIds: string;

  @IsOptional()
  @IsString({ each: true })
  tags: string;

  @IsOptional()
  @IsString()
  @IsIn(sortQuery)
  sort: SortQuery;
}
