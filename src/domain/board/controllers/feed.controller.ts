import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateFeedRequestDto } from '../dtos/create-feed-request.dto';
import { CreateFeedResponseDto } from '../dtos/create-feed-response.dto';
import { FeedService } from '../services/feed.service';
import { User } from '../../user/entities/user.entity';
import { AuthUser } from '../../user/decorators/auth-user.decorator';

@Controller('/api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async createFeed(
    @AuthUser() user: User,
    @Body() createFeedDto: CreateFeedRequestDto,
  ): Promise<CreateFeedResponseDto> {
    return this.feedService.createFeed(user, createFeedDto);
  }
}
