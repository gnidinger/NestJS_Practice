import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
