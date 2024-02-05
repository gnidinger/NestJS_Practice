import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { FeedCreateRequestDto } from '../dtos/feed-create-request.dto';
import { FeedCreateResponseDto } from '../dtos/feed-create-response.dto';
import { FeedService } from '../services/feed.service';
import { User } from '../../user/entities/user.entity';
import { AuthUser } from '../../user/decorators/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FeedFindOneResponseDto } from '../dtos/feed-find-one-response.dto';
import { FeedPaginationResponseDto } from '../dtos/feed-pagination-response.dto';
import { FeedPaginationQueryDto } from '../dtos/feed-pagination-query.dto';
import { FeedUpdateRequestDto } from '../dtos/feed-update-request.dto';
import { FeedUpdateResponseDto } from '../dtos/feed-update-response.dto';
import { FeedDeleteResponseDto } from '../dtos/feed-delete-response.dto';

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

  @Get('/:id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FeedFindOneResponseDto> {
    return this.feedService.findOneById(id);
  }

  @Get('/')
  async findAll(
    @Query(ValidationPipe) queryDto: FeedPaginationQueryDto,
  ): Promise<FeedPaginationResponseDto> {
    return this.feedService.findAll(queryDto);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateFeed(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: User,
    @Body() updateFeedDto: FeedUpdateRequestDto,
  ): Promise<FeedUpdateResponseDto> {
    return this.feedService.updateFeed(id, user, updateFeedDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteFeed(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: User,
  ): Promise<FeedDeleteResponseDto> {
    return this.feedService.deleteFeed(id, user);
  }
}
