export class FeedListResponseDto {
  id: number;
  title: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<FeedListResponseDto>) {
    Object.assign(this, partial);
  }
}
