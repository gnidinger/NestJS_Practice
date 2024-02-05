export class CreateFeedResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;

  constructor(partial: Partial<CreateFeedResponseDto>) {
    Object.assign(this, partial);
  }
}
