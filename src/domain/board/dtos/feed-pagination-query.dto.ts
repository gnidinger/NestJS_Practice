import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class FeedPaginationQueryDto {
  @Type(() => Number) // 쿼리 파라미터를 숫자로 변환
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1; // 기본값은 1

  @Type(() => Number) // 쿼리 파라미터를 숫자로 변환
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number = 20; // 기본값은 20
}
