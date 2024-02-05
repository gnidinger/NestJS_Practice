import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from '../entities/feed.entity';
import { CreateFeedRequestDto } from '../dtos/create-feed-request.dto';
import { CreateFeedResponseDto } from '../dtos/create-feed-response.dto';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private readonly feedRepository: Repository<Feed>,
  ) {}

  async createFeed(
    user: User, // 사용자 정보 인자 추가
    createFeedDto: CreateFeedRequestDto,
  ): Promise<CreateFeedResponseDto> {
    const newFeed = this.feedRepository.create({
      ...createFeedDto,
      user, // 피드 엔티티에 사용자 정보 추가
    });
    const savedFeed = await this.feedRepository.save(newFeed);

    return new CreateFeedResponseDto({
      id: savedFeed.id,
      title: savedFeed.title,
      content: savedFeed.content,
      createdAt: savedFeed.createdAt,
    });
  }
}
