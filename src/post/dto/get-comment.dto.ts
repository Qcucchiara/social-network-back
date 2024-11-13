import { IsIn, IsOptional, IsString, IsUUID } from "class-validator";

const sortPublication = ["date", "popularity"] as const;
export type SortPublication = (typeof sortPublication)[number];

export class GetCommentDto {
  @IsOptional()
  @IsUUID("all", { each: true })
  authorIds: string;

  @IsOptional()
  @IsString()
  @IsIn(sortPublication)
  sort: SortPublication;
}
