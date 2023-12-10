import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateResponseDto } from './dto/user-update-response.dto';
import { UserDeleteResponseDto } from './dto/user-delete-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { userId, username, password, confirmPassword } = createUserDto;

    // 중복된 userId가 있는지 확인
    const existingUser = await this.userRepository.findOne({
      where: { userId },
    });
    if (existingUser) {
      throw new ConflictException('User with this userId already exists');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // 비밀번호 해싱
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 새로운 사용자 객체 생성
    const user = this.userRepository.create({
      userId,
      username,
      password: hashedPassword,
    });

    // 사용자 저장 및 생성된 사용자 정보 반환 (비밀번호 제외)
    await this.userRepository.save(user);
    return new UserResponseDto(user);
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string | null> {
    const { userId, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ where: { userId } });

    if (user && (await user.validatePassword(password))) {
      return user.userId;
    } else {
      return null;
    }
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<UserResponseDto[]> {
    const { userSeq, userId, username } = filterDto;
    const query = this.userRepository.createQueryBuilder('user');

    if (userSeq !== undefined) {
      query.andWhere('user.seq = :userSeq', { userSeq });
    }

    if (userId) {
      query.andWhere('user.userId = :userId', { userId });
    }

    if (username) {
      query.andWhere('user.username = :username', { username });
    }

    const users = await query.getMany();
    return users.map((user) => new UserResponseDto(user));
  }

  async findUserById(userId: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { userId } });
    delete user.password;
    return user;
  }

  async findUserByUserSeq(userSeq: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { seq: userSeq } });

    if (!user) {
      throw new NotFoundException(`User with sequence ${userSeq} not found`);
    }

    return new UserResponseDto(user);
  }

  async updateUser(
    userSeq: number,
    currentUserSeq: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponseDto> {
    if (userSeq !== currentUserSeq) {
      throw new UnauthorizedException('You can only update your own account');
    }

    const user = await this.userRepository.findOne({ where: { seq: userSeq } });

    if (!user) {
      throw new NotFoundException(`User with sequence "${userSeq}" not found`);
    }

    const { username } = updateUserDto;
    if (username) {
      user.username = username;
    }

    await this.userRepository.save(user);

    return new UserUpdateResponseDto(user);
  }

  async deleteUser(
    userSeq: number,
    currentUserSeq: number,
  ): Promise<UserDeleteResponseDto> {
    if (userSeq !== currentUserSeq) {
      throw new UnauthorizedException('You can only delete your own account');
    }

    const user = await this.userRepository.findOne({ where: { seq: userSeq } });
    if (!user) {
      throw new NotFoundException(`User with sequence ${userSeq} not found`);
    }

    const username = user.username;

    await this.userRepository.delete(userSeq);

    return new UserDeleteResponseDto(userSeq, username, true);
  }
}
