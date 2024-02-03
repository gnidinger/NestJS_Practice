import { Expose, plainToClass } from 'class-transformer';
import { User } from '../entities/user.entity';

export class CreateUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  createdAt: Date;

  static fromEntity(entity: User) {
    return plainToClass(CreateUserResponseDto, entity, {
      excludeExtraneousValues: true,
    });
  }
}
