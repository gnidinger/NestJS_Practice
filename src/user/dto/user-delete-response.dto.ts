export class UserDeleteResponseDto {
  seq: number;
  username: string;
  isDeleted: boolean;

  constructor(seq: number, username: string, isDeleted: boolean) {
    this.seq = seq;
    this.username = username;
    this.isDeleted = isDeleted;
  }
}
