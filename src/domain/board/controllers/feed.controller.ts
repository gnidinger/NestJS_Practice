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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FeedCreateRequestDto } from '../dtos/feed-create-request.dto';
import { FeedCreateResponseDto } from '../dtos/feed-create-response.dto';
import { FeedService } from '../services/feed.service';
import { User } from '../../user/entities/user.entity';
import { AuthUser } from '../../user/decorators/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FeedFindOneResponseDto } from '../dtos/feed-find-one-response.dto';
import { FeedPaginationQueryDto } from '../dtos/feed-pagination-query.dto';

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
  @UsePipes(new ValidationPipe({ transform: true })) // 요청에서 받은 쿼리 파라미터를 DTO로 변환
  async findAll(@Query() queryDto: FeedPaginationQueryDto) {
    return this.feedService.findAll(queryDto);
  }
}
