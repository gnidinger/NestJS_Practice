import { IsOptional, IsString, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetUsersFilterDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  userSeq?: number;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  username?: string;
}
