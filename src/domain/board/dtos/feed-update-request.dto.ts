import { IsNotEmpty, IsString } from 'class-validator';

export class FeedUpdateRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
