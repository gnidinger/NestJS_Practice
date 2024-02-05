import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Feed } from './feed.entity';

@Entity({ name: 'cp_photos' })
export class Photo {
  @PrimaryGeneratedColumn({ name: 'photo_id' })
  id: number;

  @Column({ name: 'image_url' }) // 이미지 URL 컬럼명 명시적으로 지정
  imageUrl: string;

  @Column({ name: 'file_name' }) // 파일 이름 컬럼명 명시적으로 지정
  fileName: string;

  @ManyToOne(() => Feed, (feed) => feed.photos, {
    onDelete: 'CASCADE', // 연관된 feed가 삭제될 경우 photo도 함께 삭제
  })
  @JoinColumn({ name: 'feed_id' })
  feed: Feed;
}
