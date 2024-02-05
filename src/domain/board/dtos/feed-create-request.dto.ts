import { IsNotEmpty, IsString } from 'class-validator';

export class FeedCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
