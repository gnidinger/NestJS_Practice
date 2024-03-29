// src/domain/user/services/user.service.ts
import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCreateRequestDto } from '../dtos/user-create-request.dto';
import { UserCreateResponseDto } from '../dtos/user-create-response.dto';
import * as bcrypt from 'bcrypt';
import { UserFindOneResponseDto } from '../dtos/user-find-one-response.dto';
import { UserUpdateRequestDto } from '../dtos/user-update-request.dto';
import { UserUpdateResponseDto } from '../dtos/user-update-response.dto';
import { UserRole } from '../entities/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(
    createUserDto: UserCreateRequestDto,
  ): Promise<UserCreateResponseDto> {
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
      userRole: UserRole.USER,
    });

    // 사용자 저장 및 생성된 사용자 정보 반환 (비밀번호 제외)
    await this.userRepository.save(user);
    return UserCreateResponseDto.fromEntity(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<UserFindOneResponseDto | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      // 사용자가 존재하지 않는 경우 NotFoundException을 던짐.
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findAll(): Promise<UserFindOneResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      username: user.username,
    }));
  }

  async updateUser(
    id: number,
    updateUserDto: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    // 사용자 이름(username)만 업데이트
    if (updateUserDto.username !== undefined) {
      user.username = updateUserDto.username;
    }

    await this.userRepository.save(user);

    return new UserUpdateResponseDto(user);
  }
}
