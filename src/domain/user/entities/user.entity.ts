import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
