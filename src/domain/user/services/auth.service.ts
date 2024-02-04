import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(
      loginRequestDto.email,
      loginRequestDto.password,
    );
    if (!user) {
      return null;
    }
    const payload = { email: user.email, sub: user.id };
    return {
      userId: user.id,
      email: user.email,
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION_TIME'),
      }),
    };
  }
}
