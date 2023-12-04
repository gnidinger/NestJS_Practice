import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'userId' }); // 'userId' 필드를 사용자 식별 필드로 설정
  }

  async validate(userId: string, password: string): Promise<any> {
    // AuthCredentialsDto 객체를 생성하여 validateUserPassword 함수에 전달
    const authCredentialsDto = { userId, password };
    const validatedUserId =
      await this.authService.validateUserPassword(authCredentialsDto);

    // validateUserPassword 함수가 유효한 userId를 반환하지 않으면 예외를 던짐
    if (!validatedUserId) {
      throw new UnauthorizedException();
    }

    // 유효성 검사가 성공하면 userId 반환
    return validatedUserId;
  }
}
