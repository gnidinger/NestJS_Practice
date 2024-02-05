export class FeedDeleteResponseDto {
  id: number;
  isDeleted: boolean;

  constructor(id: number, isDeleted: boolean) {
    this.id = id;
    this.isDeleted = isDeleted;
  }
}
