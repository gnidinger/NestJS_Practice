// src/domain/user/services/user.service.ts
import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const { email, username, password, confirmPassword } = createUserDto;

    // 중복된 이메일이 있는지 확인
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 비밀번호가 일치하는지 확인
    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 새로운 사용자 객체 생성
    const user = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    // 사용자 저장 및 생성된 사용자 정보 반환 (비밀번호 제외)
    await this.userRepository.save(user);
    return CreateUserResponseDto.fromEntity(user);
  }
}
