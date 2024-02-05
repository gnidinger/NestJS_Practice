import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { Feed } from '../../board/entities/feed.entity';

@Entity({ name: 'cp_users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ unique: true, name: 'email' })
  email: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    name: 'role',
  })
  userRole: UserRole;

  @OneToMany(() => Feed, (feed) => feed.user, {
    cascade: true, // 연관된 feed 엔티티에 대한 삽입, 업데이트, 삭제 연산을 자동으로 적용
    eager: false, // 관계된 엔티티를 자동으로 로드하지 않음 (필요시 명시적 로드 필요)
  })
  feeds: Feed[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
