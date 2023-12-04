import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any> {
    // payload에서 userId를 추출
    const { userId } = payload;

    // UserService의 findUserById 메서드를 사용하여 userId에 해당하는 사용자 검색
    const user = await this.userService.findUserById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    // 찾은 사용자 객체를 반환
    return user;
  }
}
