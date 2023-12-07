import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Query,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
  Req,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED) // HTTP 201 상태 코드를 반환
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string; userId: string }> {
    // 성공 메시지와 사용자 ID를 반환하도록 타입을 명시
    const user = await this.userService.createUser(createUserDto);
    return { message: 'User created successfully', userId: user.userId }; // 사용자 생성 성공 메시지와 함께 사용자 ID를 반환
  }

  @Get()
  getUsers(@Query(ValidationPipe) filterDto: GetUsersFilterDto) {
    return this.userService.getUsers(filterDto);
  }

  @Get('/:userSeq')
  getUserByUserSeq(@Param('userSeq') userSeq: number) {
    return this.userService.findUserByUserSeq(userSeq);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:userSeq')
  async updateUser(
    @Req() req,
    @Param('userSeq', ParseIntPipe) userSeq: number, // ParseIntPipe를 추가하여 userSeq가 숫자임을 보장
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    const currentUserSeq = req.user.seq;
    return this.userService.updateUser(userSeq, updateUserDto, currentUserSeq);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
