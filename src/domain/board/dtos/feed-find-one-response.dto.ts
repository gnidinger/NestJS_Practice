export class FeedFindOneResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number; // 게시글 작성자의 ID

  constructor(partial: Partial<FeedFindOneResponseDto>) {
    Object.assign(this, partial);
  }
}
