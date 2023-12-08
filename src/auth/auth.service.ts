import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string | null> {
    // authCredentialsDto 객체 전체를 validateUserPassword 메서드에 전달
    const username =
      await this.userService.validateUserPassword(authCredentialsDto);

    if (username) {
      return username;
    }
    return null;
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ token: string }> {
    const userId = await this.validateUserPassword(authCredentialsDto);

    // 유효한 userId가 없다면 UnauthorizedException 발생
    if (!userId) {
      throw new UnauthorizedException();
    }

    // JWT 토큰에 userId를 포함
    const payload = { userId };
    const token = this.jwtService.sign(payload);

    return { token };
  }
}
