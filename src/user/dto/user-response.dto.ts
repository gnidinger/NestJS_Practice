import { User } from '../user.entity';

export class UserResponseDto {
  seq: number;
  userId: string;
  username: string;

  constructor(user: User) {
    this.seq = user.seq;
    this.userId = user.userId;
    this.username = user.username;
  }
}
