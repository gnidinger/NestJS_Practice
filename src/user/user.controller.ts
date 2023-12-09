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
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateResponseDto } from './dto/user-update-response.dto';
import { UserDeleteResponseDto } from './dto/user-delete-response.dto';

@Controller('/api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED) // HTTP 201 상태 코드를 반환
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  getUsers(
    @Query(ValidationPipe) filterDto: GetUsersFilterDto,
  ): Promise<UserResponseDto[]> {
    return this.userService.getUsers(filterDto);
  }

  @Get('/:userSeq')
  getUserByUserSeq(
    @Param('userSeq', ParseIntPipe) userSeq: number,
  ): Promise<UserResponseDto> {
    return this.userService.findUserByUserSeq(userSeq);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:userSeq')
  async updateUser(
    @Req() req,
    @Param('userSeq', ParseIntPipe) userSeq: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<UserUpdateResponseDto> {
    const currentUserSeq = req.user.seq;
    return this.userService.updateUser(userSeq, currentUserSeq, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:userSeq')
  deleteUser(
    @Req() req,
    @Param('userSeq', ParseIntPipe) userSeq: number,
  ): Promise<UserDeleteResponseDto> {
    const currentUserSeq = req.user.seq;
    return this.userService.deleteUser(userSeq, currentUserSeq);
  }
}
