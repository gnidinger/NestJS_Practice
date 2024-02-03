import { IsEmail, Matches, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserRequestDto {
  @IsEmail()
  email: string;

  @Matches(/^[\w.!@#$%^&*()-_+={}[\]|\\:;"'<>,.?/`~]{2,8}$/, {
    message:
      'username must be 2-8 characters long and can contain numbers, letters, and special characters, but no spaces.',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,15}$/, {
    message:
      'password must be 6-15 characters long and include at least one letter, one number, and one special character without spaces',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  confirmPassword: string; // 비밀번호 확인 필드 추가
}
