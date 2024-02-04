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
import { CreateUserRequestDto } from '../dtos/create-user-request.dto';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { UpdateUserRequestDto } from '../dtos/update-user-request.dto'; // 올바른 파일을 참조하도록 수정
import { FindOneResponseDto } from '../dtos/find-one-response.dto';
import { UpdateUserResponseDto } from '../dtos/update-user-response.dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async findAll(): Promise<FindOneResponseDto[]> {
    return this.userService.findAll();
  }

  // 특정 사용자 조회
  @Get('/:id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindOneResponseDto | undefined> {
    return this.userService.findOneById(id);
  }

  // 사용자 정보 업데이트
  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
