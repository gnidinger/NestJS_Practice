import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  userId: number;

  @Expose()
  email: string;

  @Expose()
  accessToken: string;
}
