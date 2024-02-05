import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedService } from '../services/feed.service';
import { FeedController } from '../controllers/feed.controller';
import { Feed } from '../entities/feed.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feed]), // Feed 엔티티를 현재 모듈에 등록
  ],
  controllers: [FeedController], // Feed 컨트롤러 등록
  providers: [FeedService], // Feed 서비스 등록
})
export class FeedModule {}
