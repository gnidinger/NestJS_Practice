import { FeedListResponseDto } from './feed-list-response.dto';

export class FeedPaginationResponseDto {
  data: FeedListResponseDto[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  isLastPage: boolean;

  constructor(partial: Partial<FeedPaginationResponseDto>) {
    Object.assign(this, partial);
  }
}
