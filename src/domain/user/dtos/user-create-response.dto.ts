import { User } from '../entities/user.entity';

export class UserCreateResponseDto {
  id: number;
  email: string;
  username: string;
  createdAt: Date;

  static fromEntity(entity: User): UserCreateResponseDto {
    const dto = new UserCreateResponseDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.username = entity.username;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}
