import { FeedListResponseDto } from './feed-list-response.dto';

export class FeedPaginationResponseDto {
  data: FeedListResponseDto[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}
