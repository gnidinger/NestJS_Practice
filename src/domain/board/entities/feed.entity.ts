import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Photo } from './photo.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'cp_feed' }) // 테이블 이름 지정
export class Feed {
  @PrimaryGeneratedColumn({ name: 'feed_id' }) // 컬럼 이름 지정
  id: number;

  @Column({ name: 'title' }) // 컬럼 이름 지정
  title: string;

  @Column({ type: 'text', name: 'content' }) // 컬럼 이름 지정
  content: string;

  // User 엔티티와의 관계를 정의합니다. 여기서도 외래 키 이름을 명시적으로 지정합니다.
  @ManyToOne(() => User, (user) => user.feeds)
  @JoinColumn({ name: 'user_id' }) // 외래 키 컬럼 이름 지정
  user: User;

  // Photo 엔티티와의 관계를 정의합니다.
  @OneToMany(() => Photo, (photo) => photo.feed, { cascade: true })
  photos: Photo[];

  @CreateDateColumn({ name: 'created_at' }) // 컬럼 이름 지정
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // 컬럼 이름 지정
  updatedAt: Date;
}
