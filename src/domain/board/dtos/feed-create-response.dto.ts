export class FeedCreateResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;

  constructor(partial: Partial<FeedCreateResponseDto>) {
    Object.assign(this, partial);
  }
}
