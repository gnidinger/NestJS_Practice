import { User } from '../entities/user.entity';

export class CreateUserResponseDto {
  id: number;
  email: string;
  username: string;
  createdAt: Date;

  static fromEntity(entity: User): CreateUserResponseDto {
    const dto = new CreateUserResponseDto();
    dto.id = entity.id;
    dto.email = entity.email;
    dto.username = entity.username;
    dto.createdAt = entity.createdAt;
    return dto;
  }
}
