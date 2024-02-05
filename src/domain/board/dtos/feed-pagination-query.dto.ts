import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class FeedPaginationQueryDto {
  @IsOptional()
  @Type(() => Number) // 클라이언트로부터 받은 값을 숫자로 변환
  @IsPositive()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number) // 클라이언트로부터 받은 값을 숫자로 변환
  @IsPositive()
  limit: number = 20;
}
