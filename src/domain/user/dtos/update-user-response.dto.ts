import { User } from '../entities/user.entity';

export class UpdateUserResponseDto {
  id: number;
  email: string;
  username: string;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
  }
}
