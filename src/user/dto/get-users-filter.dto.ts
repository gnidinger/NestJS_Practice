import { IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  username?: string;
}
