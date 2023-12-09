import { User } from '../user.entity';

export class UserUpdateResponseDto {
  seq: number;
  userId: string;
  username: string;

  constructor(user: User) {
    this.seq = user.seq;
    this.userId = user.userId;
    this.username = user.username;
  }
}
