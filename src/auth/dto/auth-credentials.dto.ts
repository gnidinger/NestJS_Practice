import { IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  userId: string;

  @IsString()
  @MinLength(6, {
    message: 'Password is too short',
  })
  password: string;
}
