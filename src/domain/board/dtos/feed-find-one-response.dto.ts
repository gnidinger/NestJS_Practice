export class FeedFindOneResponseDto {
  id: number;
  title: string;
  content: string;
  userId: number; // 게시글 작성자의 ID
  authorName: string; // 게시글 작성자의 이름
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<FeedFindOneResponseDto>) {
    Object.assign(this, partial);
  }
}
