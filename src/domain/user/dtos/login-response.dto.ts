export class LoginResponseDto {
  userId: number;
  email: string;
  accessToken: string;

  static fromUser(user: any, accessToken: string): LoginResponseDto {
    const dto = new LoginResponseDto();
    dto.userId = user.id;
    dto.email = user.email;
    dto.accessToken = accessToken;
    return dto;
  }
}
