export class FeedUpdateResponseDto {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<FeedUpdateResponseDto>) {
    Object.assign(this, partial);
  }
}
