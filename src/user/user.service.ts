import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
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
    delete user.password;
    return user;
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

  async findUserById(userId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { userId } });
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { userId, username } = filterDto;
    const query = this.userRepository.createQueryBuilder('user');

    if (userId) {
      query.andWhere('user.userId = :userId', { userId });
    }

    if (username) {
      query.andWhere('user.username = :username', { username });
    }

    const users = await query.getMany();
    return users;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    const { username, password } = updateUserDto;
    if (username) {
      user.username = username;
    }
    if (password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
    }

    await this.userRepository.save(user);
    return user;
  }
}
