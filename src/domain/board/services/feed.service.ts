import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from '../entities/feed.entity';
import { FeedCreateRequestDto } from '../dtos/feed-create-request.dto';
import { FeedCreateResponseDto } from '../dtos/feed-create-response.dto';
import { User } from '../../user/entities/user.entity';
import { FeedFindOneResponseDto } from '../dtos/feed-find-one-response.dto';
import { FeedPaginationResponseDto } from '../dtos/feed-pagination-response.dto';
import { FeedPaginationQueryDto } from '../dtos/feed-pagination-query.dto';
import { FeedListResponseDto } from '../dtos/feed-list-response.dto';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async createFeed(
    user: User, // 사용자 정보 인자 추가
    createFeedDto: FeedCreateRequestDto,
  ): Promise<FeedCreateResponseDto> {
    const newFeed = this.feedRepository.create({
      ...createFeedDto,
      user, // 피드 엔티티에 사용자 정보 추가
    });
    const savedFeed = await this.feedRepository.save(newFeed);

    return new FeedCreateResponseDto({
      id: savedFeed.id,
      title: savedFeed.title,
      content: savedFeed.content,
      createdAt: savedFeed.createdAt,
    });
  }

  async findOneById(id: number): Promise<FeedFindOneResponseDto> {
    const feed = await this.feedRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!feed) {
      throw new NotFoundException(`Feed with ID ${id} not found`);
    }

    return new FeedFindOneResponseDto({
      id: feed.id,
      title: feed.title,
      content: feed.content,
      userId: feed.user.id,
      authorName: feed.user.username,
      createdAt: feed.createdAt,
      updatedAt: feed.updatedAt,
    });
  }

  async findAll(
    queryDto: FeedPaginationQueryDto,
  ): Promise<FeedPaginationResponseDto> {
    const page = parseInt(queryDto.page as any, 10) || 1;
    const limit = parseInt(queryDto.limit as any, 10) || 20;
    const skip = (page - 1) * limit;

    const [results, total] = await this.feedRepository.findAndCount({
      relations: ['user'],
      skip: skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(total / limit);
    const isLastPage = page >= totalPages;

    const data = results.map(
      (feed) =>
        new FeedListResponseDto({
          id: feed.id,
          title: feed.title,
          authorName: feed.user.username,
          createdAt: feed.createdAt,
          updatedAt: feed.updatedAt,
        }),
    );

    return new FeedPaginationResponseDto({
      data,
      totalItems: total,
      totalPages,
      currentPage: page,
      isLastPage,
    });
  }
}
