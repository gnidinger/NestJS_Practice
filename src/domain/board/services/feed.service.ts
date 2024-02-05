import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from '../entities/feed.entity';
import { FeedCreateRequestDto } from '../dtos/feed-create-request.dto';
import { FeedCreateResponseDto } from '../dtos/feed-create-response.dto';
import { User } from '../../user/entities/user.entity';
import { FeedFindOneResponseDto } from '../dtos/feed-find-one-response.dto';
import { FeedListResponseDto } from '../dtos/feed-list-response.dto';
import { FeedPaginationQueryDto } from '../dtos/feed-pagination-query.dto';
import { FeedPaginationResponseDto } from '../dtos/feed-pagination-response.dto';

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
      createdAt: feed.createdAt,
      updatedAt: feed.updatedAt,
      userId: feed.user.id,
    });
  }

  async findAll(queryDto: FeedPaginationQueryDto): Promise<any> {
    const { page, limit } = queryDto;
    const [feeds, total] = await this.feedRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const lastPage = Math.ceil(total / limit);
    const isLastPage = page >= lastPage;

    const responseData = feeds.map((feed) => new FeedListResponseDto(feed));

    return {
      data: responseData,
      total,
      page,
      lastPage,
      isLastPage,
    };
  }
}
