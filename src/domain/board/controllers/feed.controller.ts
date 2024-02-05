import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FeedCreateRequestDto } from '../dtos/feed-create-request.dto';
import { FeedCreateResponseDto } from '../dtos/feed-create-response.dto';
import { FeedService } from '../services/feed.service';
import { User } from '../../user/entities/user.entity';
import { AuthUser } from '../../user/decorators/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async createFeed(
    @AuthUser() user: User,
    @Body() createFeedDto: FeedCreateRequestDto,
  ): Promise<FeedCreateResponseDto> {
    return this.feedService.createFeed(user, createFeedDto);
  }
}
