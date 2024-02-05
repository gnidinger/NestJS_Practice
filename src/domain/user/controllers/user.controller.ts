import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateRequestDto } from '../dtos/user-create-request.dto';
import { UserCreateResponseDto } from '../dtos/user-create-response.dto';
import { UserUpdateRequestDto } from '../dtos/user-update-request.dto';
import { UserFindOneResponseDto } from '../dtos/user-find-one-response.dto';
import { UserUpdateResponseDto } from '../dtos/user-update-response.dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(ValidationPipe) createUserDto: UserCreateRequestDto,
  ): Promise<UserCreateResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<UserFindOneResponseDto[]> {
    return this.userService.findAll();
  }

  // 특정 사용자 조회
  @Get('/:id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserFindOneResponseDto | undefined> {
    return this.userService.findOneById(id);
  }

  // 사용자 정보 업데이트
  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
